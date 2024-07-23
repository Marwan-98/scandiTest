<?php

declare(strict_types=1);

namespace App\Models;
use App\Models\Product as ProductModel;
use App\Models\OrderItem as OrderItemModel;

class Order extends Model {
    public function getById(string $order_id, ?int $first) {
        $stmt = $this->database->prepare("SELECT * FROM orders where id = ?");
        $stmt->bind_param("i", $order_id);
        $stmt->execute();

        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }

    public function set($total, $order_items): int {        
        $stmt = $this->database->prepare("INSERT INTO orders (total) VALUES (?)");
        $stmt->bind_param('d', $total);
        $stmt->execute();
        $order_id = $stmt->insert_id;

        $order_item_model = new OrderItemModel();
        $order_item_model->set($order_id, $order_items);

        return $order_id;
    }

    public function getAll() {
        $query = "SELECT * FROM orders";
        $result = $this->database->query($query);

        return $result;
    }
}