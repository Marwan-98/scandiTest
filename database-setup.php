<?php

$servername = "127.0.0.1";
$username = "root";
$password = 'xcJUBDq*Li4$YZ';
$dbname = "SCANDI_TEST";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('data.json');
$data = json_decode($json, true);

$categories = $data["data"]["categories"];
$products = $data["data"]["products"];

//$category_stmt = $conn->prepare("INSERT INTO Category (name, __typename) VALUES (?, ?)");
//$category_stmt->bind_param("ss", $name, $category_typename);

$product_stmt = $conn->prepare("INSERT INTO product (id, name, inStock, gallery, description, brand) VALUES (?, ?, ?, ?, ?, ?)");
$product_stmt->bind_param("ssisss", $product_id, $product_name, $in_stock, $gallery, $product_description, $brand);

$find_attribute_stmt = $conn->prepare("SELECT * FROM attribute where id = ?");
$find_attribute_stmt->bind_param("s", $attribute_id);

$create_attribute_stmt = $conn->prepare("INSERT INTO attribute (id, name, type) VALUES (?, ?, ?)");
$create_attribute_stmt->bind_param("sss", $attribute_id,$attribute_name, $attribute_type);

$find_value_stmt = $conn->prepare("SELECT * FROM value where id = ?");
$find_value_stmt->bind_param("s", $item_id);

$create_value_stmt = $conn->prepare("INSERT INTO value (id, displayValue, value) VALUES (?, ?, ?)");
$create_value_stmt->bind_param("sss", $item_id,$item_name, $item_value);

//$find_category_stmt = $conn->prepare("SELECT * FROM Category where name = ?");
//$find_category_stmt->bind_param("s", $category_name);

$create_price_stmt = $conn->prepare("INSERT INTO price (product_id, currency_id, amount) VALUES (?, ?, ?)");
$create_price_stmt->bind_param("sid", $product_id, $currency_id, $product_amount);

$find_price_stmt = $conn->prepare("SELECT * FROM price where product_id = ? AND currency_id = ?");
$find_price_stmt->bind_param("si", $product_id, $currency_id);

$create_currency_stmt = $conn->prepare("INSERT INTO currency (label, symbol) VALUES (?, ?)");
$create_currency_stmt->bind_param("ss", $currency_label, $currency_symbol);

$find_currency_stmt = $conn->prepare("SELECT * FROM currency where label = ?");
$find_currency_stmt->bind_param("s", $currency_label);

$create_attribute_set_stmt = $conn->prepare("INSERT INTO attribute_set (product_id, attribute_id) VALUES (?, ?)");
$create_attribute_set_stmt->bind_param("ss", $product_id, $attribute_id);


$create_product_attribute_value_stmt = $conn->prepare("INSERT INTO product_attribute_value (product_id, attribute_id, item_id) VALUES (?, ?, ?)");
$create_product_attribute_value_stmt->bind_param("sss", $product_id, $attribute_id, $item_id);

//foreach ($categories as $category) {
//    $category_name = $category["name"];
//    $category_typename = $category["__typename"];
//    $category_stmt->execute();
//}

foreach ($products as $product) {
    $product_id = $product["id"];
    $product_name = $product["name"];
//    $category_name = $product["category"];
    $in_stock = $product["inStock"];
    $gallery = json_encode($product["gallery"]);
    $product_description = $product["description"];
    $brand = $product["brand"];


    $product_stmt->execute();

//    $category_stmt->execute();
//    $result = $category_stmt->get_result();
//    $found_category = $result->fetch_assoc();

    $attributes = $product["attributes"];

    foreach ($attributes as $attribute) {
        $attribute_id = $attribute["id"];

        $find_attribute_stmt->execute();
        $result = $find_attribute_stmt->get_result();
        $found_attribute = $result->fetch_assoc();

        if(!$found_attribute) {
            $attribute_id = $attribute["id"];
            $attribute_name = $attribute["name"];
            $attribute_type = $attribute["type"];
            $create_attribute_stmt->execute();

            $find_attribute_stmt->execute();
            $attribute_result = $find_attribute_stmt->get_result();
            $found_attribute = $attribute_result->fetch_assoc();
        }

        $create_attribute_set_stmt->execute();

        $items = $attribute["items"];

        foreach ($items as $item) {
            $item_id = $item["id"];

            $find_value_stmt->execute();
            $item_result = $find_value_stmt->get_result();
            $found_item = $item_result->fetch_assoc();

            if(!$found_item) {
                $item_id = $item["id"];
                $item_name = $item["displayValue"];
                $item_value = $item["value"];
                $create_value_stmt->execute();

                $find_value_stmt->execute();
                $item_result = $find_value_stmt->get_result();
                $found_item = $item_result->fetch_assoc();
            }

            $create_product_attribute_value_stmt->execute();
        }
    }

    $prices = $product["prices"];

    foreach ($prices as $price) {
        $currency = $price["currency"];

        $currency_label = $currency["label"];
        $currency_symbol = $currency["symbol"];

        $find_currency_stmt->execute();
        $currency_result = $find_currency_stmt->get_result();
        $found_currency = $currency_result->fetch_assoc();

        if(!$found_currency) {
            $create_currency_stmt->execute();

            $find_currency_stmt->execute();
            $currency_result = $find_currency_stmt->get_result();
            $found_currency = $currency_result->fetch_assoc();
        }

        $currency_id = $found_currency["id"];
        $product_amount = $price["amount"];

        $create_price_stmt->execute();
    }



}
