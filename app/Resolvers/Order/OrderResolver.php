<?php

declare(strict_types=1);

namespace App\Resolvers\Order;

use App\Resolvers\Resolver;
use App\Models\Order as OrderModel;

class OrderResolver {
    private OrderModel $order;

    public function __construct()
    {
        $this->order = new OrderModel();
    }

    public function resolve($rootValue, $args): int
    {
        $total = $args['cartData']['total'];
        $order_items = $args['cartData']['orderItems'];



        return $this->order->set($total, $order_items);
    }
}