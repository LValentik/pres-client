import ReactMarkdown from 'react-markdown';

export function convertToHTML(content) {
    return <ReactMarkdown>{content}</ReactMarkdown>;
}

