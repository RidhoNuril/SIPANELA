import { useEffect, useState } from 'react';
import Footer from '../../../components/common/Footer.jsx';
import Navbar from '../../../components/common/Navbar.jsx';
import { Link } from 'react-router-dom';
import Icon from '../../../components/common/Icon';
import { EDUCATION_ARTICLES, getEducationArticles } from '../../../services/educationService.js';

function ArticleCard({ article }) {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E1E8EF] bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative h-40 overflow-hidden bg-[#E8EEF3]">
                <img
                    src={article.image}
                    alt={article.imageAlt}
                    loading="lazy"
                    className={`h-full w-full ${article.imageClass}`}
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#0B3C65]/85 px-2 py-1 text-[10px] font-medium text-white shadow-sm">
                    {article.category}
                </span>
            </div>

            <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                <div className="flex items-center gap-2 text-[10px] text-[#64748B]">
                    <span className="inline-flex items-center gap-1">
                        <Icon name="clock" className="h-3 w-3" />
                        {article.readTime}
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>{article.publisher}</span>
                </div>

                <h2 className="mt-2 text-base font-bold leading-snug text-[#0B3C65]">
                    {article.title}
                </h2>
                <p className="text-xs py-4 leading-relaxed text-[#475569]">
                    {article.description}
                </p>

                <div className="mt-auto border-t border-[#E9EEF2] pt-3">
                    <Link
                        to="/edukasi/artikel"
                        className="inline-flex w-full justify-center rounded-full border border-[#0B3C65] px-4 py-2 text-xs font-medium text-[#0B3C65] transition-colors hover:bg-[#0B3C65] hover:text-white"
                    >
                        Pelajari Selengkapnya
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function Edukasi() {
    const [articles, setArticles] = useState(EDUCATION_ARTICLES);

    useEffect(() => {
        getEducationArticles()
            .then(setArticles)
            .catch((error) => console.error('Gagal memuat artikel edukasi.', error));
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-[#F1F6FA] text-[#102B49]">
            <Navbar activePage="Edukasi" />

            <main className="w-full flex-1 px-6 pb-12 pt-8 sm:px-8 sm:pt-10">
                <section className="mx-auto max-w-6xl">
                    <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0878B8]">Wawasan Mendalam</p>
                        <h1 className="mt-1 text-xl font-bold text-[#0B3C65]">Artikel</h1>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article, index) => (
                            <ArticleCard key={`${article.title}-${index}`} article={article} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
