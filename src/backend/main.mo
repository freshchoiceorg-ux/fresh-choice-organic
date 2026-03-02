import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";




actor {
  // Product Types
  type Product = {
    id : Text;
    name : Text;
    price : Nat;
  };

  type OrderItem = {
    productId : Text;
    productName : Text;
    quantity : Nat;
    unitPrice : Nat;
    totalPrice : Nat;
  };

  type Order = {
    orderId : Nat;
    customerName : Text;
    phone : Text;
    address : Text;
    items : [OrderItem];
    totalAmount : Nat;
    paymentMethod : Text;
    upiTransactionRef : Text;
    status : Text;
    createdAt : Int;
  };

  // Persistent Hardcoded Product List
  let products = [
    { id = "brown-eggs"; name = "Brown Eggs"; price = 210 },
    { id = "white-eggs"; name = "White Eggs"; price = 80 },
    { id = "desi-eggs"; name = "Desi Eggs"; price = 240 },
    { id = "honey-200g"; name = "Forest Organic Honey 200g"; price = 250 },
    { id = "honey-1kg"; name = "Forest Organic Honey 1kg"; price = 1250 },
    { id = "chicken-desi-naatu"; name = "Desi Naatu Chicken Curry Cut"; price = 1300 },
    { id = "chicken-broiler"; name = "Broiler Chicken Skinless Curry Cut"; price = 250 },
    { id = "chicken-naatu-live"; name = "Naatu Chicken Live"; price = 850 },
  ];

  var orderCounter = 0;

  let orders = Map.empty<Nat, Order>();

  // Place Order
  public shared ({ caller }) func place_order(
    customerName : Text,
    phone : Text,
    address : Text,
    items : [OrderItem],
    totalAmount : Nat,
    paymentMethod : Text,
    upiTransactionRef : Text,
  ) : async Nat {
    orderCounter += 1;

    let order : Order = {
      orderId = orderCounter;
      customerName;
      phone;
      address;
      items;
      totalAmount;
      paymentMethod;
      upiTransactionRef;
      status = "Pending";
      createdAt = Time.now();
    };

    orders.add(orderCounter, order);
    orderCounter;
  };

  // Get All Orders (Admin)
  public query ({ caller }) func get_all_orders() : async [Order] {
    orders.values().toArray();
  };

  // Get Order by ID
  public query ({ caller }) func get_order_by_id(orderId : Nat) : async ?Order {
    orders.get(orderId);
  };

  // Update Order Status
  public shared ({ caller }) func update_order_status(orderId : Nat, newStatus : Text) : async Bool {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = {
          order with
          status = newStatus;
        };
        orders.add(orderId, updatedOrder);
        true;
      };
    };
  };

  // Calculate Total Amount for Order
  public query ({ caller }) func calculate_total_amount(items : [OrderItem]) : async Nat {
    items.foldLeft(
      0,
      func(acc, item) { acc + (item.quantity * item.unitPrice) },
    );
  };

  // Get All Products
  public query ({ caller }) func get_all_products() : async [Product] {
    products;
  };

  // Find Product by ID
  public query ({ caller }) func find_product_by_id(productId : Text) : async ?Product {
    products.find(func(p) { Text.equal(p.id, productId) });
  };

  // Create Order Item (used by frontend to build cart)
  public query ({ caller }) func create_order_item(productId : Text, quantity : Nat) : async ?OrderItem {
    switch (products.find(func(p) { Text.equal(p.id, productId) })) {
      case (null) { null };
      case (?product) {
        ?{
          productId;
          productName = product.name;
          quantity;
          unitPrice = product.price;
          totalPrice = quantity * product.price;
        };
      };
    };
  };

  // Get Orders by Customer Phone
  public query ({ caller }) func get_orders_by_phone(phone : Text) : async [Order] {
    orders.values().toArray().filter(func(order) { Text.equal(order.phone, phone) });
  };

  // Cancel Order
  public shared ({ caller }) func cancel_order(orderId : Nat) : async Bool {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = {
          order with
          status = "Cancelled";
        };
        orders.add(orderId, updatedOrder);
        true;
      };
    };
  };

  // Get Order Status
  public query ({ caller }) func get_order_status(orderId : Nat) : async Text {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order.status };
    };
  };

  // Get Orders Count (Admin)
  public query ({ caller }) func get_orders_count() : async Nat {
    orders.size();
  };

  // Get Completed Orders Count (Admin)
  public query ({ caller }) func get_completed_orders_count() : async Nat {
    var count = 0;
    orders.values().forEach(
      func(order) {
        if (Text.equal(order.status, "Delivered")) {
          count += 1;
        };
      }
    );
    count;
  };
};
