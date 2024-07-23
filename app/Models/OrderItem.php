<?php


declare(strict_types=1);

namespace App\Models;

class OrderItem extends Model {
    public function getById(string $order_item_id, ?int $first) {
        $stmt = $this->database->prepare("SELECT * FROM order_item where id = ?");
        $stmt->bind_param("i", $order_item_id);
        $stmt->execute();

        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }

    public function set($order_id, $order_items): void {
        $order_item_stmt = $this->database->prepare("INSERT INTO order_item (order_id, product_id, attributes, quantity) VALUES (?, ?, ?, ?)");
        
        foreach ($order_items as $order_product) {
            $product_attributes = json_encode($order_product['selectedAttributes']);

            $order_item_stmt->bind_param('issi', $order_id, $order_product['productId'], $product_attributes, $order_product['quantity']);
            $order_item_stmt->execute();
        }
    }

    public function getAll() {
        $query = "SELECT * FROM order_item";
        $result = $this->database->query($query);

        return $result;
    }
}