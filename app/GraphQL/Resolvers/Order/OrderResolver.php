<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers\Order;

use App\GraphQL\Resolvers\Resolver;
use App\Models\Order as OrderModel;

class OrderResolver extends Resolver {
    public function __construct()
    {
        $order_model = new OrderModel();
        
        parent::__construct($order_model);
    }   

    public function resolve($root_value, $args): int
    {
        $total = $args['cartData']['total'];
        $order_items = $args['cartData']['orderItems'];



        return $this->model->set($total, $order_items);
    }
}