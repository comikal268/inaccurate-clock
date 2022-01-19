CREATE TABLE IF NOT EXISTS public.user (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role varchar(250) NOT NULL,
    token varchar(16) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.product_entry (
    product_entry_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    time_taken TIMESTAMP,
    product_name varchar(200) NOT NULL,
    calories INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES public.user(user_id)
);
