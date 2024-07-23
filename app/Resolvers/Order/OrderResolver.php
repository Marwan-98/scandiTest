<?php

declare(strict_types=1);

namespace App\Resolvers\Order;

use App\Resolvers\Resolver;
use App\Models\Order as OrderModel;

class OrderResolver {
    public function __construct()
    {
        $order_model = new OrderModel();
        
        parent::__construct($order_model);
    }   

    public function resolve($rootValue, $args): int
    {
        $total = $args['cartData']['total'];
        $order_items = $args['cartData']['orderItems'];



        return $this->model->set($total, $order_items);
    }
}