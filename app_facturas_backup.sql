PGDMP                  
    {            app_facturas    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    33158    app_facturas    DATABASE     �   CREATE DATABASE app_facturas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Costa Rica.1252';
    DROP DATABASE app_facturas;
                postgres    false                        2615    33159    document    SCHEMA        CREATE SCHEMA document;
    DROP SCHEMA document;
                postgres    false            �            1259    33160    invoice    TABLE     z  CREATE TABLE document.invoice (
    id_invoice integer NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    issuer character varying(60) DEFAULT ' '::character varying NOT NULL,
    client character varying(60) DEFAULT ' '::character varying NOT NULL,
    type character varying(60) DEFAULT 'Factura'::character varying NOT NULL,
    currency character varying(3) DEFAULT 'USD'::character varying NOT NULL,
    description character varying(300) DEFAULT 'N/A'::character varying NOT NULL,
    amount numeric DEFAULT 0 NOT NULL,
    tax numeric DEFAULT 0.13 NOT NULL,
    state boolean NOT NULL,
    approved boolean NOT NULL
);
    DROP TABLE document.invoice;
       document         heap    postgres    false    6            �            1259    33169    factura_id_invoice_seq    SEQUENCE     �   CREATE SEQUENCE document.factura_id_invoice_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE document.factura_id_invoice_seq;
       document          postgres    false    6    216            �           0    0    factura_id_invoice_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE document.factura_id_invoice_seq OWNED BY document.invoice.id_invoice;
          document          postgres    false    217                       2604    33170    invoice id_invoice    DEFAULT     |   ALTER TABLE ONLY document.invoice ALTER COLUMN id_invoice SET DEFAULT nextval('document.factura_id_invoice_seq'::regclass);
 C   ALTER TABLE document.invoice ALTER COLUMN id_invoice DROP DEFAULT;
       document          postgres    false    217    216            �          0    33160    invoice 
   TABLE DATA           �   COPY document.invoice (id_invoice, date, issuer, client, type, currency, description, amount, tax, state, approved) FROM stdin;
    document          postgres    false    216   �       �           0    0    factura_id_invoice_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('document.factura_id_invoice_seq', 9, true);
          document          postgres    false    217            %           2606    33187    invoice factura_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY document.invoice
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_invoice);
 @   ALTER TABLE ONLY document.invoice DROP CONSTRAINT factura_pkey;
       document            postgres    false    216            �   �   x�}�A
�@��u�^�ҩu��
ET���MG�T����Y��A-�}���C'����$���,Ɠd�:�Z	���Y,IB�B7�0�R��g��H�@@��#꯸$��+
�~�-��	v�����q���Y(�����@Wdz�k��Uu���W;�Q���B��4X9�i3l)����[     