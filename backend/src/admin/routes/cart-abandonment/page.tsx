import { defineRouteConfig } from "@medusajs/admin-sdk";
import {
  Container,
  Heading,
  Button,
  Text,
  StatusBadge,
  Input,
  Select,
  Toaster,
  DropdownMenu,
} from "@medusajs/ui";
import {
  ShoppingCart,
  Clock,
  User,
  Phone,
  Eye,
  Filter,
  Download,
  MoreHorizontal,
  Play,
  RefreshCw,
  Activity,
  Package,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Cart {
  id: string;
  email?: string;
  customer?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  shipping_address?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address_1?: string;
    city?: string;
    country?: string;
  };
  billing_address?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address_1?: string;
    city?: string;
    country?: string;
  };
  items?: Array<{
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
  total?: number;
  subtotal?: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  metadata?: {
    notifications?: {
      firstSent?: boolean;
      secondSent?: boolean;
      firstSentAt?: string;
      secondSentAt?: string;
      firstError?: string;
      secondError?: string;
    };
  };
}

interface CartAbandonmentStats {
  total_carts: number;
  active_carts: number;
  carts_with_items: number;
  abandoned_carts: number;
  completed_carts: number;
}

// Removed unused interface

const getCartStatusColor = (cart: Cart) => {
  if (cart.completed_at) return "green";

  const notifications = cart.metadata?.notifications;
  if (notifications?.firstSent && notifications?.secondSent) return "red";
  if (notifications?.firstSent) return "orange";
  if (notifications?.firstError || notifications?.secondError) return "red";

  return "blue";
};

const getCartStatusText = (cart: Cart) => {
  if (cart.completed_at) return "Completed";

  const notifications = cart.metadata?.notifications;
  if (notifications?.firstSent && notifications?.secondSent) return "Abandoned";
  if (notifications?.firstSent) return "First Sent";
  if (notifications?.firstError || notifications?.secondError) return "Error";

  return "Active";
};

export default function CartAbandonmentPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [stats, setStats] = useState<CartAbandonmentStats>({
    total_carts: 0,
    active_carts: 0,
    carts_with_items: 0,
    abandoned_carts: 0,
    completed_carts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 100,
  });
  const [testConfig, setTestConfig] = useState({
    batchSize: 10,
    firstNotificationDelayHours: 1,
    secondNotificationDelayHours: 2,
    enableWhatsApp: true,
    enableEmail: false,
  });
  const [filters, setFilters] = useState({
    status: "all",
    start_date: "",
    end_date: "",
    email: "",
  });

  useEffect(() => {
    fetchCarts();
    fetchStats();
  }, [filters, pagination.currentPage]);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.status && filters.status !== "all")
        queryParams.append("status", filters.status);
      if (filters.start_date)
        queryParams.append("start_date", filters.start_date);
      if (filters.end_date) queryParams.append("end_date", filters.end_date);
      if (filters.email) queryParams.append("email", filters.email);

      // Add pagination parameters
      queryParams.append("limit", pagination.limit.toString());
      queryParams.append(
        "offset",
        ((pagination.currentPage - 1) * pagination.limit).toString()
      );

      const response = await fetch(`/admin/carts?${queryParams}`);
      const data = await response.json();
      setCarts(data.carts || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.total_pages || 1,
        totalCount: data.count || 0,
      }));
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/admin/cart-abandonment");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const processCartAbandonment = async (config?: {
    batchSize?: number;
    firstNotificationDelayHours?: number;
    secondNotificationDelayHours?: number;
    enableWhatsApp?: boolean;
    enableEmail?: boolean;
  }) => {
    try {
      setProcessing(true);

      const response = await axios.post("/admin/cart-abandonment/process", {
        batchSize: config?.batchSize || 10,
        firstNotificationDelayHours: config?.firstNotificationDelayHours || 1, // Reduced for testing
        secondNotificationDelayHours: config?.secondNotificationDelayHours || 2, // Reduced for testing
        enableWhatsApp: config?.enableWhatsApp !== false,
        enableEmail: config?.enableEmail || false,
      });

      console.log("Processing Result:", response.data);

      // Refresh data after processing
      await fetchCarts();
      await fetchStats();

      alert(
        `Processing completed!\nProcessed: ${response.data.result.processed}\nFirst notifications: ${response.data.result.first_notifications_sent}\nSecond notifications: ${response.data.result.second_notifications_sent}\nErrors: ${response.data.result.errors}`
      );
    } catch (error) {
      console.error("Error processing cart abandonment:", error);
      alert(
        "Error processing cart abandonment: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setProcessing(false);
    }
  };

  const openCartDetails = (cart: Cart) => {
    setSelectedCart(cart);
    setShowModal(true);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      start_date: "",
      end_date: "",
      email: "",
    });
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount / 100);
  };

  const getCustomerName = (cart: Cart) => {
    if (cart.customer?.first_name) {
      return `${cart.customer.first_name} ${
        cart.customer.last_name || ""
      }`.trim();
    }
    if (cart.email) {
      return cart.email.split("@")[0];
    }
    return "Guest";
  };

  const getCustomerPhone = (cart: Cart) => {
    return cart.shipping_address?.phone || cart.billing_address?.phone || "N/A";
  };

  const exportCarts = () => {
    const csvContent = [
      [
        "Cart ID",
        "Customer",
        "Email",
        "Phone",
        "Items Count",
        "Total",
        "Status",
        "Created At",
        "First Notification",
        "Second Notification",
      ].join(","),
      ...carts.map((cart) =>
        [
          cart.id,
          getCustomerName(cart),
          cart.email || cart.customer?.email || "",
          getCustomerPhone(cart),
          cart.items?.length || 0,
          cart.total || 0,
          getCartStatusText(cart),
          new Date(cart.created_at).toLocaleDateString(),
          cart.metadata?.notifications?.firstSent ? "Yes" : "No",
          cart.metadata?.notifications?.secondSent ? "Yes" : "No",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cart-abandonment-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  return (
    <Container className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading
              level="h1"
              className="text-2xl font-semibold text-gray-900"
            >
              Cart Abandonment Management
            </Heading>
            <Text className="mt-1 text-sm text-gray-600">
              Monitor and manage abandoned shopping carts
            </Text>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="small"
              onClick={exportCarts}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              onClick={() => setShowTestModal(true)}
              disabled={processing}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {processing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {processing ? "Processing..." : "Test Processing"}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm font-medium text-gray-600">
                  Total Carts
                </Text>
                <Text className="text-2xl font-bold text-gray-900">
                  {stats.total_carts}
                </Text>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm font-medium text-gray-600">
                  Active Carts
                </Text>
                <Text className="text-2xl font-bold text-green-600">
                  {stats.active_carts}
                </Text>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm font-medium text-gray-600">
                  With Items
                </Text>
                <Text className="text-2xl font-bold text-purple-600">
                  {stats.carts_with_items}
                </Text>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm font-medium text-gray-600">
                  Abandoned
                </Text>
                <Text className="text-2xl font-bold text-red-600">
                  {stats.abandoned_carts}
                </Text>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm font-medium text-gray-600">
                  Completed
                </Text>
                <Text className="text-2xl font-bold text-gray-600">
                  {stats.completed_carts}
                </Text>
              </div>
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <Heading level="h2" className="text-lg font-medium">
              Filters
            </Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Text className="text-sm font-medium mb-2">Status</Text>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters({ ...filters, status: value })
                }
              >
                <Select.Trigger>
                  <Select.Value placeholder="All Statuses" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Statuses</Select.Item>
                  <Select.Item value="active">Active (with items)</Select.Item>
                  <Select.Item value="abandoned">Abandoned</Select.Item>
                  <Select.Item value="completed">Completed</Select.Item>
                  <Select.Item value="empty">Empty Carts</Select.Item>
                  <Select.Item value="no_customer">No Customer</Select.Item>
                </Select.Content>
              </Select>
            </div>
            <div>
              <Text className="text-sm font-medium mb-2">Start Date</Text>
              <Input
                type="date"
                value={filters.start_date}
                onChange={(e) =>
                  setFilters({ ...filters, start_date: e.target.value })
                }
              />
            </div>
            <div>
              <Text className="text-sm font-medium mb-2">End Date</Text>
              <Input
                type="date"
                value={filters.end_date}
                onChange={(e) =>
                  setFilters({ ...filters, end_date: e.target.value })
                }
              />
            </div>
            <div>
              <Text className="text-sm font-medium mb-2">Email</Text>
              <Input
                placeholder="Search by email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="bg-white p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <Text className="text-sm text-gray-600">
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalCount
              )}{" "}
              of {pagination.totalCount} carts
            </Text>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="small"
                onClick={resetFilters}
                className="text-xs"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Carts List */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-8">
              <Text>Loading carts...</Text>
            </div>
          ) : carts.length === 0 ? (
            <div className="bg-white p-8 border rounded-lg text-center">
              <Text className="text-gray-500">No carts found</Text>
            </div>
          ) : (
            carts.map((cart) => (
              <div
                key={cart.id}
                className="bg-white p-1 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Text className="text-sm">{getCustomerName(cart)}</Text>
                      <Text className="text-gray-500 text-sm">
                        ({cart.id.slice(0, 8)}...)
                      </Text>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <Text>
                          {cart.email || cart.customer?.email || "Guest"}
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <Text>{getCustomerPhone(cart)}</Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="h-4 w-4" />
                        <Text>{cart.items?.length || 0} items</Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <Text>{formatDate(cart.created_at)}</Text>
                      </div>
                    </div>

                    {/* Cart Items Preview */}
                    {cart.items && cart.items.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg text-xs">
                        <div className="space-y-1">
                          {cart.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center text-sm gap-2"
                            >
                              <Text className="text-gray-700">
                                {/* @ts-ignore */}
                                ID: {item?.product_id || "N/A"}
                              </Text>
                              <Text className="text-gray-900 font-medium">
                                Qty: {item.quantity || 0}
                              </Text>
                            </div>
                          ))}
                          {cart.items.length > 3 && (
                            <Text className="text-xs text-gray-500 italic">
                              +{cart.items.length - 3} more items...
                            </Text>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg">
                        <Text className="text-sm text-gray-600">
                          📦 No items in cart
                        </Text>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <Button size="small" variant="secondary">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content align="end" className="w-48">
                        <DropdownMenu.Item
                          onClick={() => openCartDetails(cart)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="bg-white p-4 border rounded-lg">
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="secondary"
                size="small"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={
                          pagination.currentPage === page
                            ? "primary"
                            : "secondary"
                        }
                        size="small"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8"
                      >
                        {page}
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="secondary"
                size="small"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Details Modal */}
      {showModal && selectedCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Heading level="h2">Cart Details</Heading>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setShowModal(false)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <Text className="text-xl font-semibold">
                    {getCustomerName(selectedCart)}
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Text className="font-medium">Email:</Text>
                    <Text>
                      {selectedCart.email ||
                        selectedCart.customer?.email ||
                        "N/A"}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <Text>{getCustomerPhone(selectedCart)}</Text>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Text>Created: {formatDate(selectedCart.created_at)}</Text>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                    <Text>Items: {selectedCart.items?.length || 0}</Text>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              {selectedCart.items && selectedCart.items.length > 0 && (
                <div className="space-y-4">
                  <Heading level="h3" className="text-lg font-medium">
                    Cart Items
                  </Heading>
                  <div className="space-y-2">
                    {selectedCart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <Text className="font-medium">{item.title}</Text>
                          <Text className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </Text>
                        </div>
                        <Text className="font-semibold">
                          {formatCurrency(item.total)}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status and Total */}
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <StatusBadge color={getCartStatusColor(selectedCart)}>
                    {getCartStatusText(selectedCart)}
                  </StatusBadge>
                </div>
                <Text className="text-xl font-semibold">
                  Total: {formatCurrency(selectedCart.total || 0)}
                </Text>
              </div>

              {/* Notification Status */}
              {selectedCart.metadata?.notifications && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Text className="text-sm font-medium mb-2">
                    Notification Status:
                  </Text>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <Text>First Notification:</Text>
                      <Text
                        className={
                          selectedCart.metadata.notifications.firstSent
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {selectedCart.metadata.notifications.firstSent
                          ? "Sent"
                          : "Not Sent"}
                      </Text>
                    </div>
                    {selectedCart.metadata.notifications.firstSentAt && (
                      <div className="flex justify-between">
                        <Text>First Sent At:</Text>
                        <Text>
                          {formatDate(
                            selectedCart.metadata.notifications.firstSentAt
                          )}
                        </Text>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <Text>Second Notification:</Text>
                      <Text
                        className={
                          selectedCart.metadata.notifications.secondSent
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {selectedCart.metadata.notifications.secondSent
                          ? "Sent"
                          : "Not Sent"}
                      </Text>
                    </div>
                    {selectedCart.metadata.notifications.secondSentAt && (
                      <div className="flex justify-between">
                        <Text>Second Sent At:</Text>
                        <Text>
                          {formatDate(
                            selectedCart.metadata.notifications.secondSentAt
                          )}
                        </Text>
                      </div>
                    )}
                    {selectedCart.metadata.notifications.firstError && (
                      <div className="flex justify-between">
                        <Text>First Error:</Text>
                        <Text className="text-red-600">
                          {selectedCart.metadata.notifications.firstError}
                        </Text>
                      </div>
                    )}
                    {selectedCart.metadata.notifications.secondError && (
                      <div className="flex justify-between">
                        <Text>Second Error:</Text>
                        <Text className="text-red-600">
                          {selectedCart.metadata.notifications.secondError}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Raw JSON Data */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <Text className="text-sm font-medium mb-2">
                  Raw Cart Data (JSON):
                </Text>
                <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-60">
                  {JSON.stringify(selectedCart, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Configuration Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Heading
                  level="h2"
                  className="text-lg font-semibold text-gray-900"
                >
                  Test Cart Abandonment Processing
                </Heading>
                <Text className="text-sm text-gray-500">
                  Configure and run cart abandonment processing
                </Text>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Text className="text-sm font-medium mb-2">Batch Size</Text>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={testConfig.batchSize}
                  onChange={(e) =>
                    setTestConfig({
                      ...testConfig,
                      batchSize: parseInt(e.target.value) || 10,
                    })
                  }
                />
              </div>

              <div>
                <Text className="text-sm font-medium mb-2">
                  First Notification Delay (Hours)
                </Text>
                <Input
                  type="number"
                  min="0"
                  value={testConfig.firstNotificationDelayHours}
                  onChange={(e) =>
                    setTestConfig({
                      ...testConfig,
                      firstNotificationDelayHours:
                        parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div>
                <Text className="text-sm font-medium mb-2">
                  Second Notification Delay (Hours)
                </Text>
                <Input
                  type="number"
                  min="0"
                  value={testConfig.secondNotificationDelayHours}
                  onChange={(e) =>
                    setTestConfig({
                      ...testConfig,
                      secondNotificationDelayHours:
                        parseInt(e.target.value) || 2,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableWhatsApp"
                  checked={testConfig.enableWhatsApp}
                  onChange={(e) =>
                    setTestConfig({
                      ...testConfig,
                      enableWhatsApp: e.target.checked,
                    })
                  }
                />
                <Text className="text-sm">Enable WhatsApp Notifications</Text>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableEmail"
                  checked={testConfig.enableEmail}
                  onChange={(e) =>
                    setTestConfig({
                      ...testConfig,
                      enableEmail: e.target.checked,
                    })
                  }
                />
                <Text className="text-sm">Enable Email Notifications</Text>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setShowTestModal(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  processCartAbandonment(testConfig);
                  setShowTestModal(false);
                }}
                disabled={processing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {processing ? "Processing..." : "Run Test"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </Container>
  );
}

export const config = defineRouteConfig({
  label: "Cart Abandonment",
  icon: ShoppingCart,
});
