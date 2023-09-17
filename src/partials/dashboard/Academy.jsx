import DoughnutChart from "../../charts/DoughnutChart";
import useAcademystats from "../../hooks/dashboard/useAcademystats";

function Academy() {
  const { labels: originalLabels, values: originalValues } = useAcademystats();

  if (!originalLabels || !originalValues || originalLabels.length !== originalValues.length) {
    // 處理數據不可用的情況，例如顯示錯誤消息或默認值
    return <div>無法獲取數據</div>;
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const labelMappings = [
    { labelsToCombine: ["心理所一般組", "數學系", "物理學系", "心理學系"], newLabel: "理學院"},
    { labelsToCombine: ["創新領域學士學位學程"], newLabel: "創新設計學院"},
    { labelsToCombine: ["電機工程學系", "資訊工程學系", "生醫電資所", "資訊工程研究所"], newLabel: "電機資訊學院"},
    { labelsToCombine: ["生物機電工程學系"], newLabel: "生物資源暨農學院"},
    { labelsToCombine: ["經濟學系", "經濟系"], newLabel: "社會科學院"},
    { labelsToCombine: ["科際整合法律學研究所"], newLabel: "法律學院"},
    { labelsToCombine: ["材料科學與工程學系", "工程科學及海洋工程學系", "醫學工程學系"], newLabel: "工學院"},
    { labelsToCombine: ["工商管理學系 科技管理組", "工商管理學系", "會計學系", "國際企業學系", "資訊管理學系"], newLabel: "管理學院"},
    { labelsToCombine: ["物理治療學系"], newLabel: "醫學院"},
    { labelsToCombine: ["戲劇學系", "外國語文學系 / 圖書資訊學系", "歷史學系", "外國語文學系/社會學系"], newLabel: "文學院"}
]


  const mergedData = {};

  originalLabels.forEach((label, index) => {
    const value = originalValues[index];
    const mapping = labelMappings.find((mapping) => mapping.labelsToCombine.includes(label));

    if (mapping) {
      mergedData[mapping.newLabel] = (mergedData[mapping.newLabel] || 0) + value;
    } else {
      mergedData[label] = (mergedData[label] || 0) + value;
    }
  });

  const chartData = {
    labels: Object.keys(mergedData),
    datasets: [
      {
        label: "Distribution of colleges",
        data: Object.values(mergedData),
        backgroundColor: Object.keys(mergedData).map(() => getRandomColor()),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full bg-white  dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Distribution of colleges
        </h2>
      </header>
      {chartData.labels.length > 0 && <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default Academy;
