CREATE DATABASE umc_mission_db;
USE umc_mission_db;

# 사용자 정보 - user
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    gender ENUM('남', '여', '선택 안함') NOT NULL,
    birth_date DATE NOT NULL,
    phone_number VARCHAR(50) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    detail_address VARCHAR(255),
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    email VARCHAR(100) NOT NULL UNIQUE,
    point INT DEFAULT 0,
    status VARCHAR(15) NOT NULL,
    inactive_date DATETIME
);

# 서비스 이용 동의 항목  - terms
CREATE TABLE terms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    body TEXT NOT NULL,
    optional BOOLEAN NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);

# 사용자 이용 동의 항목 - user_agreements
CREATE TABLE user_agreements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    terms_id INT NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (terms_id) REFERENCES terms(id) ON DELETE CASCADE
);

# 음식 카테고리 - food_category
CREATE TABLE food_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)
);

# 선호 음식  - user_prefer_category
CREATE TABLE user_prefer_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES food_category(id) ON DELETE CASCADE
);

# 가게 - store
CREATE TABLE store (
    id INT PRIMARY KEY AUTO_INCREMENT,
    region_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    rating FLOAT CHECK (rating BETWEEN 0 AND 5),
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (region_id) REFERENCES region(id) ON DELETE CASCADE
);

# 지역  - region
CREATE TABLE region (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

# 미션 - mission
CREATE TABLE mission (
    id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    deadline DATETIME NOT NULL,
    criterion INT NOT NULL,
    reward INT NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
);

# 사용자 미션 - user_mission
CREATE TABLE user_mission (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    mission_id INT NOT NULL,
    status VARCHAR(100) NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (mission_id) REFERENCES mission(id) ON DELETE CASCADE
);

# 사용자 리뷰 - user_review
CREATE TABLE user_review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating FLOAT CHECK (rating BETWEEN 0 AND 5),
    content TEXT NOT NULL,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
);