--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--
CREATE USER shortlydbuser WITH PASSWORD 'senha_ultra_secreta_do_usuario_shortlydbuser';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO shortlydbuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO shortlydbuser;

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" character varying NOT NULL,
    url character varying NOT NULL,
    "visitCount" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" character varying(255)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'ZPDxTggB', 'https://www.google.com.br', NULL, NULL, '2023-05-19 14:32:49.778165');
INSERT INTO public.urls VALUES (2, '7dAzE6zw', 'https://www.google.com.br', NULL, NULL, '2023-05-19 14:45:06.94997');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'teste', '0teste@gmail.com', '123456', '2023-05-18 00:08:45.850389', NULL);
INSERT INTO public.users VALUES (4, 'Vini', 'vinicius@vinicius.com', '123456', '2023-05-18 22:59:39.271465', NULL);
INSERT INTO public.users VALUES (6, 'Vinicius Vieira', 'vinicius@gmail.com', '123456', '2023-05-18 23:03:43.804093', NULL);
INSERT INTO public.users VALUES (7, 'Pablo Vieira', 'pablo@gmail.com', '123456', '2023-05-18 23:06:50.227052', NULL);
INSERT INTO public.users VALUES (2, 'pedro', 'pedro@gmail.com', '123456', '2023-05-18 22:51:06.996629', 'abcdauhquas2344$asdajisd');
INSERT INTO public.users VALUES (8, 'teste hash Vieira', 'hash@gmail.com', '$2b$10$U8hfnIpUP5at47QDylmYKuwMMKfut3vqD5NwE/oNVsU/EI8lXjhFm', '2023-05-19 00:55:10.230368', NULL);
INSERT INTO public.users VALUES (9, 'Sophia Macedo', 'MariaEduarda88@gmail.com', '$2b$10$enDXwH7AZwOZ7d2Ql8FY..Y13GKcmveb2GIKzkfA3x2yOtVhJs2Zi', '2023-05-19 15:41:41.894041', NULL);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shorturl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_shorturl_key UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_userid_fkey FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: TABLE urls; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.urls TO shortlydbuser;


--
-- Name: SEQUENCE urls_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON SEQUENCE public.urls_id_seq TO shortlydbuser;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.users TO shortlydbuser;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT  ALL  ON SEQUENCE public.users_id_seq TO shortlydbuser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO shortlydbuser;


--
-- PostgreSQL database dump complete
--

