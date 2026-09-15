import { Card, CardContent } from "@/components/ui/card";
import { FaHeartbeat, FaCapsules, FaBell } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="my-12 px-4">
      <h2 className="text-4xl font-bold mb-10 text-white text-center">
        Welcome to Shravan Parent Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Medicine Reminders */}
        <Card className="bg-neutral-900 border border-neutral-700 text-white shadow-md hover:shadow-purple-600/20 transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaCapsules className="text-blue-400 text-2xl" />
              <h3 className="text-xl font-semibold">Medicine Reminders</h3>
            </div>
            <ul className="list-disc list-inside space-y-2">
              <li>💊 Vitamin D – <span className="text-sm text-neutral-400">9:00 AM</span></li>
              <li>💊 BP Tablet – <span className="text-sm text-neutral-400">6:00 PM</span></li>
              <li>💊 Sugar Control – <span className="text-sm text-neutral-400">8:00 PM</span></li>
            </ul>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-neutral-900 border border-neutral-700 text-white shadow-md hover:shadow-yellow-400/20 transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaBell className="text-yellow-400 text-2xl" />
              <h3 className="text-xl font-semibold">Alerts</h3>
            </div>
            <p className="text-yellow-300 text-sm">
              ✅ No current alerts. Everything looks good!
            </p>
          </CardContent>
        </Card>

        {/* Health Report */}
        <Card className="bg-neutral-900 border border-neutral-700 text-white shadow-md hover:shadow-red-400/20 transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaHeartbeat className="text-red-400 text-2xl" />
              <h3 className="text-xl font-semibold">Health Report</h3>
            </div>
            <ul className="space-y-2">
              <li>
                📝 Last checkup: <span className="font-medium text-neutral-300">2 days ago</span>
              </li>
              <li>
                💓 Blood Pressure: <span className="text-green-400 font-semibold">120/80</span>
              </li>
              <li>
                🫀 Heart Rate: <span className="text-green-400 font-semibold">72 bpm</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
