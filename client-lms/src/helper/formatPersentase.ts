export const getPersentase = (value: number, total: number) => {
    if (total === 0) return "0%";
    const persentase = (value / total) * 100;
    return persentase.toFixed(0) + "%";
}