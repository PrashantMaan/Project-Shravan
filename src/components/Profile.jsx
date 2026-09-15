import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Day 1", heartRate: 78 },
  { day: "Day 2", heartRate: 82 },
  { day: "Day 3", heartRate: 79 },
  { day: "Day 4", heartRate: 80 },
];

const Profile = () => {
  return (
    <div id="profile" className="my-20 px-4">
      {/* Animated Heading */}
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl font-bold text-white my-32"
      >
        PROFILE
      </motion.h2>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 bg-black/40 p-8 rounded-2xl shadow-lg border border-neutral-800 max-w-5xl mx-auto">
        {/* Info Section */}
        <div className="text-lg space-y-4 text-white w-full lg:w-1/2">
          <p><span className="font-semibold text-white">Name:</span> John Doe</p>
          <p><span className="font-semibold text-white">Heart Rate:</span> 80 bpm</p>
          <p><span className="font-semibold text-white">Blood Pressure:</span> 120/80</p>
          <p><span className="font-semibold text-white">Blood Sugar:</span> 100 mg/dL</p>
          <p><span className="font-semibold text-white">Disease Prediction:</span> No disease predicted</p>
        </div>

        {/* Graph Section */}
        <div className="w-full lg:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" domain={[77, 83]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="heartRate"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
