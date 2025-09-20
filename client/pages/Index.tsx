import { Card } from "@/components/ui/card";

export default function Index() {
  const marketplaceItems = [
    {
      name: "Organic Tomato",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/87dbfd14ab7d02cbc5242a5522ecbd9c4f130182?width=598",
      bgColor: "bg-agriculture-light-pink"
    },
    {
      name: "Organic Wheat", 
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6a884d42985542987f4b2464063e7ef3b705aa05?width=518",
      bgColor: "bg-agriculture-medium-pink"
    },
    {
      name: "Carrots",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a1a41ce595d99ea96e987f012f8dc2f24e2ebfc3?width=434", 
      bgColor: "bg-agriculture-medium-pink"
    },
    {
      name: "Basmati Rice",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/de9bd4f2ee4f78e86e489073fc71be94cf166cf9?width=518",
      bgColor: "bg-agriculture-light-pink"
    },
    {
      name: "Onions",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/185d58af62fff9f69dbeca0e3cee5d2654a9c547?width=336",
      bgColor: "bg-agriculture-medium-pink"
    },
    {
      name: "Radish", 
      image: "https://api.builder.io/api/v1/image/assets/TEMP/a1a41ce595d99ea96e987f012f8dc2f24e2ebfc3?width=434",
      bgColor: "bg-agriculture-medium-pink"
    }
  ];

  const governmentSchemes = [
    "Pension Scheme",
    "Kisan Credit Card (KCC)", 
    "Soil Health Card Scheme",
    "Rashtriya Krishi Vikas Yojana (RKVY)"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[387px] mx-auto max-w-[1382px] mt-[94px] rounded-[10px] overflow-hidden">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/ebaa5de6aab3da2e3de2e92352eb52b61d28c798?width=2764"
          alt="Agricultural landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl lg:text-[96px] font-normal text-white leading-tight mb-4">
            HARITKRANTI
          </h1>
          <p className="text-lg md:text-xl text-white font-normal">
            Your Partner in Modern Farming
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1400px] mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weather Forecast Section */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium text-black mb-8">Real Time Weather Forecast</h2>
          <div className="w-full max-w-[340px] h-[182px] bg-gray-300 rounded-[10px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">25°C</div>
                <div className="text-sm">Partly Cloudy</div>
                <div className="flex justify-center space-x-2 mt-2">
                  <div className="text-xs">Mon 24°</div>
                  <div className="text-xs">Tue 26°</div>
                  <div className="text-xs">Wed 23°</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Schemes Section */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium text-black mb-8">Government Schemes</h2>
          <div className="bg-white p-8 rounded-[10px] border border-gray-200">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/4640d0d4c71b7b376a1b13431fb053ba8fdbb94d?width=540"
              alt="Government schemes illustration"
              className="w-full h-[171px] object-cover rounded-[20px] mb-6"
            />
            <div className="space-y-3">
              {governmentSchemes.map((scheme, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-agriculture-scheme-blue text-base font-medium underline hover:no-underline transition-all"
                >
                  {scheme}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium text-black mb-8">Marketplace</h2>
          <div className="border border-black rounded-[10px] p-6 bg-white">
            <div className="grid grid-cols-3 gap-4">
              {marketplaceItems.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-[107px] h-[117px] ${item.bgColor} rounded-[10px] p-4 flex items-center justify-center mb-3 mx-auto`}>
                    <div className="w-[71px] h-[87px] rounded-[10px] overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-lg font-medium text-black leading-tight">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Assistance Section */}
      <div className="max-w-[1400px] mx-auto px-4 mt-16 mb-16">
        <h2 className="text-xl font-medium text-black mb-8">Farmer Assistance and Guidance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[20px] overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/5e3e2903dff748faaf38b9644d6e540d69e35fff?width=506"
              alt="Seasonal Crop Recommendations"
              className="w-full h-[157px] object-cover"
            />
            <div className="p-6">
              <h3 className="font-medium text-black">Seasonal Crop Recommendations</h3>
              <p className="text-sm text-gray-600 mt-2">Get expert advice on the best crops to plant based on season and location.</p>
            </div>
          </div>
          <div className="bg-white rounded-[20px] overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/cef83c7df68a0a281b66c3830af56cf7601ccfce?width=494"
              alt="Farming Tips & Articles"
              className="w-full h-[157px] object-cover"
            />
            <div className="p-6">
              <h3 className="font-medium text-black">Farming Tips & Articles</h3>
              <p className="text-sm text-gray-600 mt-2">Access a collection of helpful tips and articles on modern farming techniques.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
