import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/logo.svg';
import { SearchBar } from './SearchBar.jsx';
import { SearchResultsList } from './SearchResultsList.jsx';
import IndexedDBDataProvider from './IndexedDBDataProvider.jsx'; 

export const Autores = () => {
    var LogoIF = require('../public/ifms-dr-marca-2015.png');
    var LogoEmbrapa = require('../public/logo-embrapa-400.png');
    var LogoIFEmbrapa = require('../public/logo-if-embrapa.png');

    const [results, setResults] = useState([]);

    const handleCloseResults = () => {
        setResults([]);
    };

    return (
        <>
            <Head>
                <title>TecnofamApp</title>
            </Head>

            <IndexedDBDataProvider
                apiUrl="https://api-cartilha-teste.onrender.com/api/autors?populate=*"
                dbName="api-autores"
                storeName="autores"
                keyPath="id"
            >
                {(data) => (
                    <>
                        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top" aria-label="Offcanvas navbar large">
                            <div className="container-fluid">
                                <div className="d-flex align-items-center">
                                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
                                        <i className="fas fa-bars"></i>
                                    </button>
                                    <Link className="navbar-brand" href="/home">
                                        <Image src={Logo} width={350} height={54} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" />
                                    </Link>
                                </div>
                                <div className="search-container first-form-search p-1">
                                    <div className="search-bar-container">
                                        <SearchBar setResults={setResults} />
                                        {results && results.length > 0 && <SearchResultsList results={results} handleCloseResults={handleCloseResults} />}
                                    </div>
                                </div>
                                <div className="offcanvas offcanvas-start text-bg-light" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
                                    <div className="offcanvas-header">
                                        <ul className="navbar-nav d-flex links-logo-ifembrapa flex-row mx-1">
                                            <li className="nav-item">
                                                <Link href="/home">
                                                    <Image src={LogoIFEmbrapa} className='img-navbar-menu me-3' width="100%" height={46} alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas" priority />
                                                </Link>
                                            </li>
                                        </ul>
                                        <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <hr className="featurette-divider"></hr>
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 center-itens">
                                            <li className="nav-item">
                                                <Link className="nav-link back-item-link" href="/edicao-completa" aria-current="page">
                                                    Edição Completa
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link back-item-link" href="/autores" aria-current="page">
                                                    Autores
                                                </Link>
                                            </li>
                                        </ul>
                                        <div id="searchForm" className="search-container position-relative p-1">
                                            <div className="search-bar-container">
                                                <SearchBar setResults={setResults} />
                                                {results && results.length > 0 && <SearchResultsList results={results} handleCloseResults={handleCloseResults} />}
                                            </div>
                                        </div>
                                        <ul className="navbar-nav d-flex links-logo flex-row">
                                            <li className="nav-item second-logo-inst">
                                                <Image src={LogoIF} className='logotipo me-3' width="100%" height={32} alt="Logotiopo do IFMS Campus Dourados" priority />
                                            </li>
                                            <li className="nav-item second-logo-inst">
                                                <Image src={LogoEmbrapa} className='logotipo' width="100%" height={48} alt="Logotiopo da Embrapa" priority />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        <div className="showcaseSection">
                            <div className="headerTitle">
                                <h1>Autores</h1>
                            </div>
                            <div className="main-container-cards container-cards">
                                {data.length > 0 ? (
                                    data.map((item) => {
                                        const descriptionData = JSON.parse(item.attributes.description);

                                        return (
                                            <div key={item.id} className="card">
                                                <div className="containerAutor_v1t1">
                                                    <div className="containerFoto_oz_I">
                                                        <img
                                                            src={`${descriptionData.blocks[0].data.file.url}`}
                                                            alt="Foto dos Autores"
                                                            width="100%"
                                                        />
                                                    </div>
                                                    <p className="bold nome-autor">{item.attributes.name}</p>
                                                </div>
                                                <div className="cardContainer_HEVx">
                                                    <p className="descricao-autor">{descriptionData.blocks[1].data.text}</p>
                                                </div>
                                                <div className="action-card">
                                                    {descriptionData.blocks.map((block) => {
                                                        if (block.type === 'paragraph') {
                                                            const match = block.data.text.match(/<a[^>]*>.*?<\/a>/);
                                                            if (match) {
                                                                return (
                                                                    <div key={block.id} dangerouslySetInnerHTML={{ __html: match[0] }} />
                                                                );
                                                            } else {
                                                                return null;
                                                            }
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Carregando dados...</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </IndexedDBDataProvider>

            <footer>
                <div className="container container-footer">
                    <div className="title-footer">
                        <p>Embrapa Agropecuária Oeste</p>
                    </div>
                    <div className="description-footer">
                        <p>Rodovia BR 163, Km 253,6, Caixa Postal 449, CEP: 79804-970, Dourados, MS</p>
                        <p>Fone: + 55 (67) 3416-9700</p>
                    </div>
                </div>
            </footer>
        </>
    );
};
