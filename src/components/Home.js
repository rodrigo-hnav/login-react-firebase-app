import { useAuth } from "../context/authContext";

const Home = () => {
  //<a target="_blank" href="https://icons8.com/icon/lfDg4PLtFjWi/super-mario">Super Mario</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    await logOut();
  };
  if (loading) return <h1>Cargando...</h1>;
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24">
          <div className="relative ">
            <div className="absolute left-0">
              <div className="flex items-center mt-8 space-x-6">
                <img
                  className="h-12 w-12"
                  src={require("../assets/img/icons8-super-mario.svg").default}
                  alt="Workflow"
                />
                <a
                  href="#!"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tablero
                </a>

                <a
                  href="#!"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Proyectos
                </a>
              </div>
            </div>
            <div className="absolute right-0 mt-8">
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-stone-200 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Tablero</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h1>Bienvenid@ {user?.displayName || user?.email}</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
