export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en', { dateStyle: "long", timeStyle: "short" }).format(date);
}