import { useEffect, useState } from "react";
import {
  TooltipItem,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { api } from "../../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../rtk/store";
import Loader from "../../../components/Loader";
import Fallback from "../../../components/Fallback";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type StatsType = {
  totalItems: number;
  totalAmount: number;
};

export const UserDashboardMain = () => {
  const [stats, setStats] = useState<StatsType>({
    totalAmount: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);

  const getStats = async () => {
    try {
      setLoading(true);
      const response = await api.getStats(user.id);
      setStats(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("An error occurred while fetching stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, [user.id]);

  // chart

  const chartData = {
    labels: ["Total Payments", "Total purchased products"],
    datasets: [
      {
        label: "User stats",
        data: [stats.totalAmount, stats.totalItems],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"bar">) {
            const rawValue = tooltipItem.raw as number;

            if (tooltipItem.label === "Total Payments") {
              return `Total Payments: $${rawValue.toFixed(2)}`;
            }
            return `${tooltipItem.label}: ${rawValue}`;
          },
        },
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Fallback />;
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500">No stats data available</div>
    );
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p>
          Hi, <span className="text-primary-dark">{user?.email}</span>! Welcome
          to your dashboard
        </p>
      </div>

      <div className="my-5 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary-dark cursor-pointer hover:scale-105 transition-all duration-200">
            <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
            <p className="text-2xl font-bold">${stats?.totalAmount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary-dark cursor-pointer hover:scale-105 transition-all duration-200">
            <h2 className="text-xl font-semibold mb-2">
              Total Purchased Products
            </h2>
            <p className="text-2xl font-bold">{stats?.totalItems}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
