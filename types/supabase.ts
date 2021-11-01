/* eslint-disable */
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/pages": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.pages.id"];
          user_id?: parameters["rowFilter.pages.user_id"];
          title?: parameters["rowFilter.pages.title"];
          content?: parameters["rowFilter.pages.content"];
          created_at?: parameters["rowFilter.pages.created_at"];
          published_at?: parameters["rowFilter.pages.published_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["pages"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** pages */
          pages?: definitions["pages"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.pages.id"];
          user_id?: parameters["rowFilter.pages.user_id"];
          title?: parameters["rowFilter.pages.title"];
          content?: parameters["rowFilter.pages.content"];
          created_at?: parameters["rowFilter.pages.created_at"];
          published_at?: parameters["rowFilter.pages.published_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.pages.id"];
          user_id?: parameters["rowFilter.pages.user_id"];
          title?: parameters["rowFilter.pages.title"];
          content?: parameters["rowFilter.pages.content"];
          created_at?: parameters["rowFilter.pages.created_at"];
          published_at?: parameters["rowFilter.pages.published_at"];
        };
        body: {
          /** pages */
          pages?: definitions["pages"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/posts": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          user_id?: parameters["rowFilter.posts.user_id"];
          title?: parameters["rowFilter.posts.title"];
          slug?: parameters["rowFilter.posts.slug"];
          excerpt?: parameters["rowFilter.posts.excerpt"];
          content?: parameters["rowFilter.posts.content"];
          created_at?: parameters["rowFilter.posts.created_at"];
          published_at?: parameters["rowFilter.posts.published_at"];
          cover?: parameters["rowFilter.posts.cover"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["posts"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          user_id?: parameters["rowFilter.posts.user_id"];
          title?: parameters["rowFilter.posts.title"];
          slug?: parameters["rowFilter.posts.slug"];
          excerpt?: parameters["rowFilter.posts.excerpt"];
          content?: parameters["rowFilter.posts.content"];
          created_at?: parameters["rowFilter.posts.created_at"];
          published_at?: parameters["rowFilter.posts.published_at"];
          cover?: parameters["rowFilter.posts.cover"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          user_id?: parameters["rowFilter.posts.user_id"];
          title?: parameters["rowFilter.posts.title"];
          slug?: parameters["rowFilter.posts.slug"];
          excerpt?: parameters["rowFilter.posts.excerpt"];
          content?: parameters["rowFilter.posts.content"];
          created_at?: parameters["rowFilter.posts.created_at"];
          published_at?: parameters["rowFilter.posts.published_at"];
          cover?: parameters["rowFilter.posts.cover"];
        };
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  pages: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    user_id: string;
    title: string;
    slug: string;
    content: string;
    created_at?: string;
    published_at?: string;
  };
  posts: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    user_id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    created_at?: string;
    published_at?: string;
    cover: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** pages */
  "body.pages": definitions["pages"];
  "rowFilter.pages.id": string;
  "rowFilter.pages.user_id": string;
  "rowFilter.pages.title": string;
  "rowFilter.pages.content": string;
  "rowFilter.pages.created_at": string;
  "rowFilter.pages.published_at": string;
  /** posts */
  "body.posts": definitions["posts"];
  "rowFilter.posts.id": string;
  "rowFilter.posts.user_id": string;
  "rowFilter.posts.title": string;
  "rowFilter.posts.slug": string;
  "rowFilter.posts.excerpt": string;
  "rowFilter.posts.content": string;
  "rowFilter.posts.created_at": string;
  "rowFilter.posts.published_at": string;
  "rowFilter.posts.cover": string;
}

export interface operations {}

export interface external {}
