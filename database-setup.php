<?php

$servername = "mysql";
$username = "root";
$password = 'temppassword';
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

$conn->query("CREATE TABLE category (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );");

$conn->query("CREATE TABLE product (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category_id INT NOT NULL,
                inStock BOOLEAN NOT NULL,
                description VARCHAR(255),
                brand VARCHAR(255),
                FOREIGN KEY (category_id) REFERENCES category(id)
            );");

$conn->query("CREATE TABLE gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,

                FOREIGN KEY (product_id) REFERENCES product(id)
            );");

$conn->query("CREATE TABLE attribute (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(255) NOT NULL
            );");

$conn->query("CREATE TABLE value (
                id VARCHAR(255) PRIMARY KEY,
                displayValue VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL
            );");

$conn->query("CREATE TABLE currency (
                id INT AUTO_INCREMENT PRIMARY KEY,
                label VARCHAR(3),
                symbol VARCHAR(1) NOT NULL
            );");

$conn->query("CREATE TABLE price (
                product_id VARCHAR(255) NOT NULL,
                currency_id INT NOT NULL,
                amount DECIMAL(5, 2) NOT NULL,
                FOREIGN KEY (product_id) REFERENCES product(id),
                FOREIGN KEY (currency_id) REFERENCES currency(id),

                PRIMARY KEY (product_id, currency_id)
            );");

$conn->query("CREATE TABLE attribute_set (
                product_id VARCHAR(255) NOT NULL,
                attribute_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (product_id) REFERENCES product(id),
                FOREIGN KEY (attribute_id) REFERENCES attribute(id),

                PRIMARY KEY (product_id, attribute_id)
            );");

$conn->query("CREATE TABLE product_attribute_value (
                product_id VARCHAR(255) NOT NULL,
                attribute_id VARCHAR(255) NOT NULL,
                item_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (attribute_id) REFERENCES attribute(id),
                FOREIGN KEY (product_id) REFERENCES product(id),
                FOREIGN KEY (item_id) REFERENCES value(id),

                PRIMARY KEY (product_id, attribute_id, item_id)
            );");


$create_category_stmt = $conn->prepare("INSERT INTO category (name) VALUES (?)");
$create_category_stmt->bind_param("s", $category_name);

$product_stmt = $conn->prepare("INSERT INTO product (id, name, category_id, inStock, description, brand) VALUES (?, ?, ?, ?, ?, ?)");
$product_stmt->bind_param("ssiiss", $product_id, $product_name, $category_id, $in_stock, $product_description, $brand);

$gallery_stmt = $conn->prepare("INSERT INTO gallery (product_id, url) VALUES (?,?)");
$gallery_stmt->bind_param("ss", $product_id, $url);

$find_attribute_stmt = $conn->prepare("SELECT * FROM attribute where id = ?");
$find_attribute_stmt->bind_param("s", $attribute_id);

$create_attribute_stmt = $conn->prepare("INSERT INTO attribute (id, name, type) VALUES (?, ?, ?)");
$create_attribute_stmt->bind_param("sss", $attribute_id,$attribute_name, $attribute_type);

$find_value_stmt = $conn->prepare("SELECT * FROM value where id = ?");
$find_value_stmt->bind_param("s", $item_id);

$create_value_stmt = $conn->prepare("INSERT INTO value (id, displayValue, value) VALUES (?, ?, ?)");
$create_value_stmt->bind_param("sss", $item_id,$item_name, $item_value);

$find_category_stmt = $conn->prepare("SELECT * FROM category where name = ?");
$find_category_stmt->bind_param("s", $category_name);

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

foreach ($categories as $category) {
    $category_name = $category["name"];
    $create_category_stmt->execute();
}

foreach ($products as $product) {
    $product_id = $product["id"];
    $product_name = $product["name"];
    $category_name = $product["category"];
    $in_stock = $product["inStock"];
    $product_description = $product["description"];
    $brand = $product["brand"];

    $find_category_stmt->execute();
    $result = $find_category_stmt->get_result();
    $found_category = $result->fetch_assoc();
    $category_id = $found_category["id"];

    $product_stmt->execute();

    foreach ($product["gallery"] as $url) {
        $gallery_stmt->execute();
    }

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
