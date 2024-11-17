import { Either } from "@/providers/types/either";

export class ApiResult<Return> {
  constructor(private underlying: Either<ApiError, Return>) {}

  static success<Return>(data: Return) {
    return new ApiResult(Either.right(data));
  }

  static fails(error: ApiError) {
    return new ApiResult(Either.left(error));
  }

  isSuccess() {
    return this.underlying.isRight;
  }

  isFails() {
    return this.underlying.isLeft;
  }

  getErrorMessage(): string {
    return this.underlying.left.message;
  }

  /**
   * Get error code: Chú ý hiện tại chức năng này chưa hoạt động do BE chưa trả về code
   */
  getErrorCode(): string | null {
    return this.underlying.left.code;
  }

  data(): Return {
    return this.underlying.right;
  }
}

type WithoutBody = <Return>(
  path: string,
  options?: RequestInit,
) => Promise<ApiResult<Return>>;

type WithBody = <Body, Return>(
  path: string,
  body: Body,
  options?: RequestInit,
) => Promise<ApiResult<Return>>;

export type EmptyBody = Record<string, never>;

export interface ApiError {
  code: string;
  message: string;
}

async function handleIfErrorReturned<U>(
  response: Response,
): Promise<ApiResult<U>> {
  if (response.ok) {
    if (response.status == 204) {
      return ApiResult.success<never>(null as never);
    }

    return ApiResult.success(<U>await response.json());
  }

  return ApiResult.fails(<ApiError>await response.json());
}

// Do request & handle client error
async function doRequest<U>(
  request: () => Promise<Response>,
): Promise<ApiResult<U>> {
  try {
    const response = await request();
    return await handleIfErrorReturned(response);
  } catch (e) {
    return ApiResult.fails({ code: "unknown", message: (e as Error).message });
  }
}

const withBody = async <Body, Return>(
  method: "POST" | "PUT",
  api: string,
  body: Body,
  options?: RequestInit,
) => {
  return doRequest<Return>(() => {
    return fetch(api, {
      method: method,
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  });
};

export const post: WithBody = async <Body, Return>(
  path: string,
  body: Body,
  options?: RequestInit,
) => {
  return withBody<Body, Return>("POST", path, body, options);
};

export const put: WithBody = async <Body, Return>(
  path: string,
  body: Body,
  options?: RequestInit,
) => {
  return withBody<Body, Return>("PUT", path, body, options);
};

export const get: WithoutBody = async <Return>(
  api: string,
  options?: RequestInit,
) => {
  return doRequest<Return>(() => {
    return fetch(api, {
      method: "GET",
      credentials: "include",
      ...options,
    });
  });
};

export const deleteRequest: WithoutBody = async <Return>(
  api: string,
  options?: RequestInit,
) => {
  const response = await fetch(api, {
    method: "DELETE",
    credentials: "include",
    ...options,
  });

  return handleIfErrorReturned<Return>(response);
};

export const downloadWithBody = async <Body>(
  api: string,
  body: Body,
  options?: RequestInit,
) => {
  try {
    const response = await fetch(api, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
    if (response.ok) {
      const responseBody = await response.blob();
      const blob = new Blob([responseBody], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = getFilename(
        response.headers.get("Content-Disposition") ?? "",
      );
      link.click();
      URL.revokeObjectURL(link.href);
    }

    return ApiResult.fails(<ApiError>await response.json());
  } catch (e) {
    return ApiResult.fails({ code: "unknown", message: (e as Error).message });
  }
};

const getFilename = (disposition: string) => {
  if (disposition.indexOf("inline") < 0) {
    return "";
  } else {
    const filenameRegex = /filename="(.*)"/;
    const matches = filenameRegex.exec(disposition);
    if (matches && matches[1] != null) {
      return matches[1].replace(/['"]/g, "");
    } else {
      return "";
    }
  }
};

// export default {
//   get,
//   post,
//   put,
//   delete: deleteRequest,
// };

export default {
  get,
  post,
  put,
  delete: deleteRequest,
  doRequest,
  handleIfErrorReturned,
};
