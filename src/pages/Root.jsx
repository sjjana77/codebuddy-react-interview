import { Outlet } from "react-router-dom";

const Root = () => (
  <div>
    <header className="bg-blue-600 p-4 text-white">
      <h1 className="text-2xl font-bold">Multi-Step Form Application</h1>
    </header>
    <main className="p-4">
      <Outlet />
    </main>
  </div>
);

export default Root;

