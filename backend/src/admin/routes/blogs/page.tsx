import { defineRouteConfig } from "@medusajs/admin-sdk";
import { DocumentText, PencilSquare } from "@medusajs/icons";
import {
  createDataTableCommandHelper,
  DataTableRowSelectionState,
  toast,
} from "@medusajs/ui";
import {
  createDataTableColumnHelper,
  Container,
  DataTable,
  useDataTable,
  Heading,
  StatusBadge,
  Toaster,
  DataTablePaginationState,
  Button,
  IconButton,
} from "@medusajs/ui";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { sdk } from "../../lib/config";
import { Link } from "react-router-dom";
import CreateBlogModal from "./create-blog-modal";

type Blog = {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  cover_image?: string;
  content: string;
  author_name: string;
  status: "draft" | "published" | "archived";
  slug: string;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
};

const columnHelper = createDataTableColumnHelper<Blog>();

const columns = [
  columnHelper.select(),
  columnHelper.accessor("title", {
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-xs">
        <div className="font-medium text-gray-900 truncate">
          {row.original.title}
        </div>
        {row.original.subtitle && (
          <div className="text-sm text-gray-500 truncate mt-1">
            {row.original.subtitle}
          </div>
        )}
      </div>
    ),
  }),
  columnHelper.accessor("author_name", {
    header: "Author",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {row.original.author_name}
      </div>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const color =
        row.original.status === "published"
          ? "green"
          : row.original.status === "draft"
          ? "grey"
          : "red";
      return (
        <StatusBadge color={color}>
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </StatusBadge>
      );
    },
  }),
  columnHelper.accessor("created_at", {
    header: "Created",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {new Date(row.original.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    ),
  }),
  columnHelper.accessor("id", {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Link to={`/blogs/${row.original.id}`}>
          <IconButton
            variant="transparent"
            size="small"
            className="text-gray-600 hover:text-gray-900"
          >
            <PencilSquare className="h-4 w-4" />
          </IconButton>
        </Link>
      </div>
    ),
  }),
];

const commandHelper = createDataTableCommandHelper();

const useCommands = (refetch: () => void) => {
  return [
    commandHelper.command({
      label: "Publish",
      shortcut: "P",
      action: async (selection) => {
        const blogsToPublishIds = Object.keys(selection);

        sdk.client
          .fetch("/admin/blogs/status", {
            method: "POST",
            body: {
              ids: blogsToPublishIds,
              status: "published",
            },
          })
          .then(() => {
            toast.success("Blogs published successfully");
            refetch();
          })
          .catch(() => {
            toast.error("Failed to publish blogs");
          });
      },
    }),
    commandHelper.command({
      label: "Move to Draft",
      shortcut: "D",
      action: async (selection) => {
        const blogsToDraftIds = Object.keys(selection);

        sdk.client
          .fetch("/admin/blogs/status", {
            method: "POST",
            body: {
              ids: blogsToDraftIds,
              status: "draft",
            },
          })
          .then(() => {
            toast.success("Blogs moved to draft");
            refetch();
          })
          .catch(() => {
            toast.error("Failed to move blogs to draft");
          });
      },
    }),
    commandHelper.command({
      label: "Archive",
      shortcut: "A",
      action: async (selection) => {
        const blogsToArchiveIds = Object.keys(selection);

        sdk.client
          .fetch("/admin/blogs/status", {
            method: "POST",
            body: {
              ids: blogsToArchiveIds,
              status: "archived",
            },
          })
          .then(() => {
            toast.success("Blogs archived successfully");
            refetch();
          })
          .catch(() => {
            toast.error("Failed to archive blogs");
          });
      },
    }),
  ];
};

const limit = 15;

const BlogsPage = () => {
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const offset = useMemo(() => {
    return pagination.pageIndex * limit;
  }, [pagination]);

  const { data, isLoading, refetch } = useQuery<{
    blogs: Blog[];
    count: number;
    limit: number;
    offset: number;
  }>({
    queryKey: ["blogs", offset, limit],
    queryFn: () =>
      sdk.client.fetch("/admin/blogs", {
        query: {
          offset: pagination.pageIndex * pagination.pageSize,
          limit: pagination.pageSize,
          order: "-created_at",
        },
      }),
  });

  const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>(
    {}
  );

  const commands = useCommands(refetch);
  const table = useDataTable({
    columns,
    data: data?.blogs || [],
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
    getRowId: (row) => row.id,
    commands,
    rowSelection: {
      state: rowSelection,
      onRowSelectionChange: setRowSelection,
    },
  });

  return (
    <Container className="p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Heading
              level="h1"
              className="text-2xl font-semibold text-gray-900"
            >
              Blog Management
            </Heading>
            <p className="mt-1 text-sm text-gray-600">
              Manage your blog posts, drafts, and published content
            </p>
          </div>
          <Button
            variant="primary"
            size="small"
            onClick={() => setShowCreateModal(true)}
            className="shrink-0"
          >
            Create Blog
          </Button>
        </div>

        {/* Data Table Section */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <DataTable instance={table}>
            <DataTable.Toolbar className="border-b border-gray-200 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Heading
                    level="h2"
                    className="text-lg font-medium text-gray-900"
                  >
                    All Blogs
                  </Heading>
                  {data && (
                    <span className="text-sm text-gray-500">
                      {data.count} total
                    </span>
                  )}
                </div>
              </div>
            </DataTable.Toolbar>

            <div className="overflow-hidden">
              <DataTable.Table />
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <DataTable.Pagination />
            </div>

            <DataTable.CommandBar
              selectedLabel={(count) =>
                `${count} blog${count !== 1 ? "s" : ""} selected`
              }
            />
          </DataTable>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateBlogModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            refetch();
          }}
        />
      )}

      <Toaster />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Blogs",
  icon: DocumentText,
});

export default BlogsPage;
