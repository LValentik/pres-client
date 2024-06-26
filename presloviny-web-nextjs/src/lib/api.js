import axios from 'axios';
import { ENDPOINTS } from '@/lib/endpoints';


const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export default async function fetchData(endpoint, params = '') {
    try {
        const url = `${endpoint}${params}`;
        const response = await apiClient.get(url);
        if (response.data) {
            return response.data.data || response.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            return null;
        }
    } catch (error) {
        console.error(`An error occurred while fetching ${endpoint}:`, error.message);
        return null;
    }
}

async function fetchDataWithMeta(endpoint, params = '') {
    try {
        const url = `${endpoint}${params}`;
        const response = await apiClient.get(url);

        if (response.data) {
            return response.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            return null;
        }
    } catch (error) {
        console.error(`An error occurred while fetching ${endpoint}:`, error.message);
        return null;
    }
}

async function fetchAndExtract(endpoint, params = '') {
    try {
        const data = await fetchData(endpoint, params);
        if (!data) return [];
        return data[0].attributes;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

export async function loadCategoriesBase() {
    return await fetchData(ENDPOINTS.CATEGORIES, '?fields=name');
}

export async function loadCategories() {
    const data = await fetchData(ENDPOINTS.CATEGORIES, '?fields=name');
    if (!data) return [];
    return data.map(({ attributes: { name } }) => name.charAt(0).toUpperCase() + name.slice(1));
}

export async function getAllArticles() {
    return await fetchAndExtract(ENDPOINTS.ARTICLES, '?populate=*') || [];
}

export async function getArticlesByCategorie(category, page, pageSize) {
    return await fetchData(ENDPOINTS.ARTICLES, `?populate[featuredImage][fields][0]=url&filters[category][name][$eq]=${category}&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
}

export async function getLastMainArticle() {
    return await fetchAndExtract(ENDPOINTS.ARTICLES, '?populate[featuredImage][fields][0]=url&filters[priority][$eq]=main&sort[0]=publishedAt:desc&pagination[pageSize]=1');
}

export async function getSecondaryArticles() {
    return await fetchData(ENDPOINTS.ARTICLES, '?populate[featuredImage][fields][0]=url&filters[priority][$eq]=secondary&sort[0]=publishedAt:desc&pagination[pageSize]=3');
}

export async function getRegularArticles() {
    return await fetchData(ENDPOINTS.ARTICLES, '?populate[featuredImage][fields][0]=url&filters[priority][$eq]=regular&sort[0]=publishedAt:desc&pagination[pageSize]=3');
}

export async function getThirdArticles() {
    return await fetchData(ENDPOINTS.ARTICLES, '?populate[featuredImage][fields][0]=url&filters[priority][$eq]=third&sort[0]=publishedAt:desc&pagination[pageSize]=3');
}

export async function getArticleBySlug(slug) {
    return await fetchAndExtract(
        ENDPOINTS.ARTICLES,
        `?filters[slug][$eq]=${slug}&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=caption&populate[author][fields][0]=name&populate[secondImage][fields][0]=url&populate[secondImage][fields][1]=caption&populate[thirdImage][fields][0]=url&populate[thirdImage][fields][1]=caption`
    );
}

export async function getAuthorById(id) {
    return await fetchData(`${ENDPOINTS.AUTHORS}/${id}`, '?populate[picture][fields][0]=url');
}

export async function getAuthors() {
    return await fetchData(ENDPOINTS.AUTHORS, '?populate[picture][fields][0]=url');
}

export async function getLast6Articles() {
    return await fetchData(ENDPOINTS.ARTICLES, '?populate[featuredImage][fields][0]=url&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=6');
}

export async function getLastMagazine() {
    return await fetchAndExtract(ENDPOINTS.MAGAZINES, '?populate[cover][fields][0]=url&sort[0]=publishedDate:desc&pagination[page]=1&pagination[pageSize]=1');
}

export async function getMagazines(page, pageSize) {
    const response = await fetchDataWithMeta(ENDPOINTS.MAGAZINES, `?populate[cover][fields][0]=url&populate[pdf][fields][0]=url&sort[0]=publishedDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    if (response) {
        return {
            magazines: response.data,
            meta: response.meta
        };
    } else {
        return {
            magazines: [],
            meta: null
        };
    }
}

export async function getMagazineBySlug(slug) {
    return await fetchAndExtract(ENDPOINTS.MAGAZINES, `?filters[slug][$eq]=${slug}&populate[cover][fields][0]=url`);
}

export const getHeaderCategories = async () => {
    try {
        const data = await fetchData(ENDPOINTS.CATEGORIES, '?fields[0]=name&sort[0]=position:asc');
        if (!data) return [];
        return data
    } catch (error) {
        console.error('Error fetching header categories:', error);
        return [];
    }
};


// ARTICLES FILTERED BY CATEGORY AND PAGINATION ORDERED BY PUBLISHED DATE
// the params are: category, page, pageSize
export async function getArticlesByCategory(category, page, pageSize) {
    const response = await fetchDataWithMeta(ENDPOINTS.ARTICLES, `?populate[featuredImage][fields][0]=url&filters[category][name][$eq]=${category}&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    if (response) {
        return {
            articles: response.data,
            meta: response.meta
        };
    } else {
        return {
            articles: [],
            meta: null
        };
    }
}

export async function getContactInfo() {
    return await fetchData(ENDPOINTS.CONTACT_INFO, '?fields[0]=email&fields[1]=number&fields[2]=address&fields[3]=googleMapsUrl');
}

export async function getManagerEmail() {
    const email = await fetchData(ENDPOINTS.MANAGER_EMAIL, '?fields[0]=email');
    return email ? email.attributes : null;
}

//filter bar search


export async function getArticlesBySearchOrContent(query, page, pageSize) {
    const searchResponse = await fetchDataWithMeta(ENDPOINTS.ARTICLES, `?populate[featuredImage][fields][0]=url&filters[title][$contains]=${query}&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    const contentResponse = await fetchDataWithMeta(ENDPOINTS.ARTICLES, `?populate[featuredImage][fields][0]=url&filters[content][$contains]=${query}&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);

    if (!searchResponse && !contentResponse) {
        return {
            articles: [],
            meta: null
        };
    }

    const articles = [...(searchResponse?.data || []), ...(contentResponse?.data || [])];
    const uniqueArticles = articles.filter((article, index, self) =>
        index === self.findIndex((a) => a.attributes.title === article.attributes.title)
    );

    return {
        articles: uniqueArticles,
        meta: searchResponse?.meta || contentResponse?.meta || null
    };
}

export async function getAllArticlesByContentAndTitle(query) {
    const titleResponse = await fetchDataWithMeta(ENDPOINTS.ARTICLES, `?fields[0]=slug&filters[title][$contains]=${query}`);
    const contentResponse = await fetchDataWithMeta(ENDPOINTS.ARTICLES, `?fields[0]=slug&filters[content][$contains]=${query}`);

    const articles = [...(titleResponse?.data || []), ...(contentResponse?.data || [])];

    const uniqueArticles = articles.filter((article, index, self) =>
        index === self.findIndex((a) => a.attributes.slug === article.attributes.slug)
    );

    return uniqueArticles.length;
}
