PGDMP         -            	    v           nutri_track    10.5    10.5     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �
           1262    24668    nutri_track    DATABASE     �   CREATE DATABASE nutri_track WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE nutri_track;
             postgres    false            �
           0    0    DATABASE nutri_track    COMMENT     K   COMMENT ON DATABASE nutri_track IS 'For Meal Nutritional Content Tracker';
                  postgres    false    2814                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false                        0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    6                       0    0    SCHEMA public    ACL     &   GRANT ALL ON SCHEMA public TO PUBLIC;
                  postgres    false    6                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false                       0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    24787    ingredients    TABLE     G  CREATE TABLE public.ingredients (
    ingredient_id integer NOT NULL,
    ndbno character varying(255),
    ingredient text,
    amount numeric(19,0),
    calories numeric(19,2),
    fat numeric(19,2),
    protein numeric(19,2),
    carbs numeric(19,2),
    fiber numeric(19,2),
    sugar numeric(19,2),
    meal_id integer
);
    DROP TABLE public.ingredients;
       public         postgres    false    6            �            1259    24785    ingredients_ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredients_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.ingredients_ingredient_id_seq;
       public       postgres    false    199    6                       0    0    ingredients_ingredient_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;
            public       postgres    false    198            �            1259    24776    meals    TABLE     q  CREATE TABLE public.meals (
    id integer NOT NULL,
    name character varying(255),
    description text,
    image_url character varying(255),
    total_amount numeric(19,0),
    total_calories numeric(19,2),
    total_fat numeric(19,2),
    total_protein numeric(19,2),
    total_carbs numeric(19,2),
    total_fiber numeric(19,2),
    total_sugar numeric(19,2)
);
    DROP TABLE public.meals;
       public         postgres    false    6            �            1259    24774    meals_id_seq    SEQUENCE     �   CREATE SEQUENCE public.meals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.meals_id_seq;
       public       postgres    false    197    6                       0    0    meals_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.meals_id_seq OWNED BY public.meals.id;
            public       postgres    false    196            w
           2604    24790    ingredients ingredient_id    DEFAULT     �   ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);
 H   ALTER TABLE public.ingredients ALTER COLUMN ingredient_id DROP DEFAULT;
       public       postgres    false    199    198    199            v
           2604    24779    meals id    DEFAULT     d   ALTER TABLE ONLY public.meals ALTER COLUMN id SET DEFAULT nextval('public.meals_id_seq'::regclass);
 7   ALTER TABLE public.meals ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197            �
          0    24787    ingredients 
   TABLE DATA               �   COPY public.ingredients (ingredient_id, ndbno, ingredient, amount, calories, fat, protein, carbs, fiber, sugar, meal_id) FROM stdin;
    public       postgres    false    199   �       �
          0    24776    meals 
   TABLE DATA               �   COPY public.meals (id, name, description, image_url, total_amount, total_calories, total_fat, total_protein, total_carbs, total_fiber, total_sugar) FROM stdin;
    public       postgres    false    197   �                  0    0    ingredients_ingredient_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 28, true);
            public       postgres    false    198                       0    0    meals_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.meals_id_seq', 9, true);
            public       postgres    false    196            {
           2606    24795    ingredients ingredients_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public         postgres    false    199            y
           2606    24784    meals meals_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_pkey;
       public         postgres    false    197            �
   �  x�=QKs�0>�_��C{�Z	���fZ��qn�(Fv4&���L�}W�.�ղ�~�]�1�Ƞ��^V0���|��Z۹��3����
���
�t�)
.3
�*�&y,蚋��*�����=���v���e��L��h^:�5=����������lK�_�Oע�:8���I]�`�9Rr�����ʻR��Li:�i��A��L��LqE`�%u �`�R�y�	BJ��B�	����=Y8��#U���5�����\�5����	FG�z�2M$�u���6Ͳ��גH���SkBt���5�l����u]�sC�ϛ/�<n)���W��-�I��h�ʃ�$c*��+��40U�e�撶���]V[��j�zO�U��۪���*KJ�j��+�����JA_&��F8&,_Ʃ9��+���GQ����h      �
   �   x�u�AN�0EדSp�1��rNP�r�ǵ�-�[NO��3��O���K���:.�-O@�~��|�PWn�l����bI��Ojfl,�QNG�fuR󬦃X�NA|���?sj:������7����3��Q�.t�����9[�%��^�و������e�8�Y�Io�oɐ�>%���zL6~�0�M�$V�Vj_�nco �/�`����N���G9��0|(y�     