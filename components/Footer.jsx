export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-8">
      {/* Top Section  */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* 1 - Left (BisaMe) */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">BisaMe</h3>
          <ul className="space-y-1 text-sm">
            <li>Customer support:</li>
            <li>+233 59 867 3304</li>
            <li>Koree Mari Link</li>
            <li>Achimota Greater Accra</li>
            <li>bisamecustomercare@gmail.com</li>
          </ul>
        </div>

        {/*  - Quick Links */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>Wallet</li>
            <li>Customer Support</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/*  - Download App */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">Download App</h3>
          <div className="flex gap-2 flex-wrap">
            <button className="bg-black text-white px-3 py-2 rounded text-sm">
              Google Play
            </button>
            <button className="bg-black text-white px-3 py-2 rounded text-sm">
              App Store
            </button>
          </div>
        </div>

        {/*  Popular Tags */}
        <div className="flex-1">
          <h3 className="font-bold mb-2">POPULAR TAGS</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <div className="flex flex-wrap gap-2">
              <li className="bg-gray-800 rounded py-0.5 px-2">Game</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">iPhone</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Tv</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Asus Laptop</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Macbook</li>
            </div>
            <div className="flex flex-wrap gap-2">
              <li className="bg-gray-800 rounded py-0.5 px-2">SSD</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Graphic</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Power Bank</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Smart Tv</li>
            </div>
            <div className="flex flex-wrap gap-2">
              <li className="bg-gray-800 rounded py-0.5 px-2">Speaker</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Tablet</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Microwave</li>
              <li className="bg-gray-800 rounded py-0.5 px-2">Samsung</li>
            </div>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        BisaMe online store © 2025 | All Rights Reserved
      </div>
    </footer>
  );
}
