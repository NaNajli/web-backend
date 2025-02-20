-- table structure for table "upcoming"
CREATE TABLE IF NOT EXISTS public.upcoming (
    upc_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    upc_name character varying NOT NULL,
    upc_image character varying NOT NULL,
    upc_description text NOT NULL,
    upc_price numeric (9, 0) NOT NULL,
    upc_rate numeric (9, 0) NOT NULL,
    CONSTRAINT upcoming_pkey PRIMARY KEY(upc_id)
);