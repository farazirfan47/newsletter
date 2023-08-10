import ReactPDF from "@react-pdf/renderer";
import MyDocument from "./generate_pdf.js";
import { scrapTickers, scrapChartData, polygonNews } from "./scrap_data.js";

const generateReport = async () => {
    console.log("STARTING GENERATE REPORT");
    console.log("SCRAPING TICKERS");
    const tickersData = await scrapTickers();
    console.log("SCRAPING CHART DATA");
    const chartData = await scrapChartData();
    console.log("SCRAPING NEWS");
    const newsData = await polygonNews();
    console.log("DONE GENERATING REPORT");
    return { tickersData, chartData, newsData };
}
generateReport().then((data) => {
    console.log("GENERATING PDF");
    ReactPDF.render(<MyDocument data={data} />, `./example.pdf`);
});