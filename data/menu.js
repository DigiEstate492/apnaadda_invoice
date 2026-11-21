// Defaults only. Business details are edited in the app's Settings tab; menu items in the Menu tab.
// Both are saved in the browser.
export const BUSINESS = {
  name: "Apna Stay",
  tagline: "Where Mountains Meet Memories",
  address: "Serene Hills of Charaktaal",
  phone: "",
  email: "",
  gstin: "",
  fssai: "",
  taxPercent: 5,
  prefix: "AA",
  footer: "",
};

export const DEFAULT_TAX_PERCENT = 5;

// Generated from apna_adda_food_menu.json. price 0 = not printed on menu; set it at billing time.
// Bump MENU_VERSION whenever you edit this list so browsers pick up the change.
export const MENU_VERSION = 2;

export const MENU = [
  {
    "id": "breakfast-aloo-paratha",
    "category": "Breakfast",
    "sub": "Paratha & Light Items",
    "name": "Aloo Paratha",
    "price": 95
  },
  {
    "id": "breakfast-gobi-paratha",
    "category": "Breakfast",
    "sub": "Paratha & Light Items",
    "name": "Gobi Paratha",
    "price": 100
  },
  {
    "id": "breakfast-pyaz-paratha",
    "category": "Breakfast",
    "sub": "Paratha & Light Items",
    "name": "Pyaz Paratha",
    "price": 100
  },
  {
    "id": "breakfast-paneer-paratha",
    "category": "Breakfast",
    "sub": "Paratha & Light Items",
    "name": "Paneer Paratha",
    "price": 130
  },
  {
    "id": "breakfast-plain-paratha",
    "category": "Breakfast",
    "sub": "Paratha & Light Items",
    "name": "Plain Paratha",
    "price": 90
  },
  {
    "id": "breakfast-poha",
    "category": "Breakfast",
    "sub": "Other Items",
    "name": "Poha",
    "price": 140
  },
  {
    "id": "breakfast-sandwich",
    "category": "Breakfast",
    "sub": "Other Items",
    "name": "Sandwich",
    "price": 50
  },
  {
    "id": "breakfast-grilled-sandwich",
    "category": "Breakfast",
    "sub": "Other Items",
    "name": "Grilled Sandwich",
    "price": 65
  },
  {
    "id": "breakfast-2-boiled-eggs",
    "category": "Breakfast",
    "sub": "Egg Items",
    "name": "2 Boiled Eggs",
    "price": 50
  },
  {
    "id": "breakfast-bread-omelette-2-eggs",
    "category": "Breakfast",
    "sub": "Egg Items",
    "name": "Bread Omelette (2 Eggs)",
    "price": 140
  },
  {
    "id": "breakfast-egg-bhurji-2-eggs",
    "category": "Breakfast",
    "sub": "Egg Items",
    "name": "Egg Bhurji (2 Eggs)",
    "price": 130
  },
  {
    "id": "bread-tava-roti",
    "category": "Bread",
    "sub": "",
    "name": "Tava Roti",
    "price": 20
  },
  {
    "id": "bread-butter-roti",
    "category": "Bread",
    "sub": "",
    "name": "Butter Roti",
    "price": 30
  },
  {
    "id": "bread-chulla-roti",
    "category": "Bread",
    "sub": "",
    "name": "Chulla Roti",
    "price": 35
  },
  {
    "id": "snacks-chilly-paneer",
    "category": "Snacks",
    "sub": "",
    "name": "Chilly Paneer",
    "price": 260
  },
  {
    "id": "snacks-chicken-pakoda",
    "category": "Snacks",
    "sub": "",
    "name": "Chicken Pakoda",
    "price": 250
  },
  {
    "id": "snacks-sprout-chaat",
    "category": "Snacks",
    "sub": "",
    "name": "Sprout Chaat",
    "price": 150
  },
  {
    "id": "snacks-aloo-chaat",
    "category": "Snacks",
    "sub": "",
    "name": "Aloo Chaat",
    "price": 150
  },
  {
    "id": "snacks-chilly-chicken",
    "category": "Snacks",
    "sub": "",
    "name": "Chilly Chicken",
    "price": 350
  },
  {
    "id": "snacks-chilly-mushroom-seasonal",
    "category": "Snacks",
    "sub": "",
    "name": "Chilly Mushroom (Seasonal)",
    "price": 300
  },
  {
    "id": "snacks-chilly-potato",
    "category": "Snacks",
    "sub": "",
    "name": "Chilly Potato",
    "price": 200
  },
  {
    "id": "snacks-green-salad",
    "category": "Snacks",
    "sub": "",
    "name": "Green Salad",
    "price": 120
  },
  {
    "id": "snacks-chicken-nuggets",
    "category": "Snacks",
    "sub": "",
    "name": "Chicken Nuggets",
    "price": 150
  },
  {
    "id": "snacks-veg-nuggets",
    "category": "Snacks",
    "sub": "",
    "name": "Veg Nuggets",
    "price": 130
  },
  {
    "id": "snacks-cheese-nuggets",
    "category": "Snacks",
    "sub": "",
    "name": "Cheese Nuggets",
    "price": 140
  },
  {
    "id": "snacks-butter-burn",
    "category": "Snacks",
    "sub": "",
    "name": "Butter Burn",
    "price": 50
  },
  {
    "id": "snacks-pav-bhajji",
    "category": "Snacks",
    "sub": "",
    "name": "Pav Bhajji",
    "price": 150
  },
  {
    "id": "main-course-veg-kadhi-chawal",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Kadhi Chawal",
    "price": 160
  },
  {
    "id": "main-course-veg-dal-chawal",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Dal Chawal",
    "price": 210
  },
  {
    "id": "main-course-veg-dal-chawal-2",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Dal Chawal",
    "price": 110
  },
  {
    "id": "main-course-veg-dal-tadka",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Dal Tadka",
    "price": 180
  },
  {
    "id": "main-course-veg-chole-chawal",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Chole Chawal",
    "price": 170
  },
  {
    "id": "main-course-veg-arhar-toor-dal",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Arhar (Toor) Dal",
    "price": 160
  },
  {
    "id": "main-course-veg-chana-dal",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Chana Dal",
    "price": 150
  },
  {
    "id": "main-course-veg-pahadi-dal",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Pahadi Dal",
    "price": 180
  },
  {
    "id": "main-course-veg-dal-makhani",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Dal Makhani",
    "price": 190
  },
  {
    "id": "main-course-veg-rajma",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Rajma",
    "price": 190
  },
  {
    "id": "main-course-veg-mix-veg",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Mix Veg",
    "price": 260
  },
  {
    "id": "main-course-veg-aloo-jeera",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Aloo Jeera",
    "price": 180
  },
  {
    "id": "main-course-veg-palak-paneer",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Palak Paneer",
    "price": 300
  },
  {
    "id": "main-course-veg-shahi-paneer",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Shahi Paneer",
    "price": 300
  },
  {
    "id": "main-course-veg-kadai-paneer",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Kadai Paneer",
    "price": 300
  },
  {
    "id": "main-course-veg-muttar-mushroom",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Muttar Mushroom",
    "price": 300
  },
  {
    "id": "main-course-veg-muttar-paneer",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Muttar Paneer",
    "price": 300
  },
  {
    "id": "main-course-veg-kofta",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Kofta",
    "price": 300
  },
  {
    "id": "main-course-veg-gatte-gravy",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Gatte Gravy",
    "price": 200
  },
  {
    "id": "main-course-veg-aloo-gobhi",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Aloo Gobhi",
    "price": 200
  },
  {
    "id": "main-course-veg-capsicum-aloo",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Capsicum Aloo",
    "price": 200
  },
  {
    "id": "main-course-veg-seasonal-vegetable",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Seasonal Vegetable",
    "price": 180
  },
  {
    "id": "main-course-veg-jeera-rice",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Jeera Rice",
    "price": 180
  },
  {
    "id": "main-course-veg-pulao",
    "category": "Main Course (Veg)",
    "sub": "",
    "name": "Pulao",
    "price": 300
  },
  {
    "id": "raita-curd-mix-raita",
    "category": "Raita / Curd",
    "sub": "",
    "name": "Mix Raita",
    "price": 130
  },
  {
    "id": "raita-curd-plain-curd",
    "category": "Raita / Curd",
    "sub": "",
    "name": "Plain Curd",
    "price": 50
  },
  {
    "id": "raita-curd-boondi-raita",
    "category": "Raita / Curd",
    "sub": "",
    "name": "Boondi Raita",
    "price": 120
  },
  {
    "id": "raita-curd-aloo-raita",
    "category": "Raita / Curd",
    "sub": "",
    "name": "Aloo Raita",
    "price": 120
  },
  {
    "id": "non-veg-kadhai-chicken",
    "category": "Non Veg",
    "sub": "",
    "name": "Kadhai Chicken",
    "price": 500
  },
  {
    "id": "non-veg-pahadi-chicken",
    "category": "Non Veg",
    "sub": "",
    "name": "Pahadi Chicken",
    "price": 600
  },
  {
    "id": "non-veg-fish-curry",
    "category": "Non Veg",
    "sub": "",
    "name": "Fish Curry",
    "price": 700
  },
  {
    "id": "non-veg-mutton",
    "category": "Non Veg",
    "sub": "",
    "name": "Mutton",
    "price": 700
  },
  {
    "id": "chinese-chilly-chicken",
    "category": "Chinese",
    "sub": "",
    "name": "Chilly Chicken",
    "price": 350
  },
  {
    "id": "chinese-chilly-chicken-gravy",
    "category": "Chinese",
    "sub": "",
    "name": "Chilly Chicken (Gravy)",
    "price": 450
  },
  {
    "id": "chinese-noodles",
    "category": "Chinese",
    "sub": "",
    "name": "Noodles",
    "price": 120
  },
  {
    "id": "chinese-manchurian",
    "category": "Chinese",
    "sub": "",
    "name": "Manchurian",
    "price": 210
  },
  {
    "id": "south-indian-idli-sambhar",
    "category": "South Indian",
    "sub": "",
    "name": "Idli & Sambhar",
    "price": 120
  },
  {
    "id": "south-indian-upma",
    "category": "South Indian",
    "sub": "",
    "name": "Upma",
    "price": 100
  },
  {
    "id": "desserts-gulab-jamun",
    "category": "Desserts",
    "sub": "",
    "name": "Gulab Jamun",
    "price": 0
  },
  {
    "id": "desserts-pahadi-kheer",
    "category": "Desserts",
    "sub": "",
    "name": "Pahadi Kheer",
    "price": 0
  },
  {
    "id": "desserts-ice-cream",
    "category": "Desserts",
    "sub": "",
    "name": "Ice Cream",
    "price": 0
  },
  {
    "id": "desserts-halwa",
    "category": "Desserts",
    "sub": "",
    "name": "Halwa",
    "price": 0
  },
  {
    "id": "drinks-home-stay-special-drink",
    "category": "Drinks",
    "sub": "",
    "name": "Home Stay Special Drink",
    "price": 60
  },
  {
    "id": "drinks-kulhad-chai",
    "category": "Drinks",
    "sub": "",
    "name": "Kulhad Chai",
    "price": 40
  },
  {
    "id": "drinks-hot-coffee",
    "category": "Drinks",
    "sub": "",
    "name": "Hot Coffee",
    "price": 35
  },
  {
    "id": "drinks-masala-lassi",
    "category": "Drinks",
    "sub": "",
    "name": "Masala Lassi",
    "price": 80
  },
  {
    "id": "drinks-sweet-lassi",
    "category": "Drinks",
    "sub": "",
    "name": "Sweet Lassi",
    "price": 100
  },
  {
    "id": "drinks-mango-shake",
    "category": "Drinks",
    "sub": "",
    "name": "Mango Shake",
    "price": 150
  },
  {
    "id": "drinks-bourn-vita",
    "category": "Drinks",
    "sub": "",
    "name": "Bourn Vita",
    "price": 100
  },
  {
    "id": "drinks-banana-shake",
    "category": "Drinks",
    "sub": "",
    "name": "Banana Shake",
    "price": 130
  },
  {
    "id": "drinks-cold-coffee",
    "category": "Drinks",
    "sub": "",
    "name": "Cold Coffee",
    "price": 150
  },
  {
    "id": "drinks-lemon-grass-tea",
    "category": "Drinks",
    "sub": "",
    "name": "Lemon Grass Tea",
    "price": 50
  },
  {
    "id": "drinks-mineral-water",
    "category": "Drinks",
    "sub": "",
    "name": "Mineral Water",
    "price": 40
  },
  {
    "id": "appetisers-mix-pakoda",
    "category": "Appetisers",
    "sub": "",
    "name": "Mix Pakoda",
    "price": 130
  },
  {
    "id": "appetisers-french-fries",
    "category": "Appetisers",
    "sub": "",
    "name": "French Fries",
    "price": 130
  },
  {
    "id": "appetisers-peanut-chaat",
    "category": "Appetisers",
    "sub": "",
    "name": "Peanut Chaat",
    "price": 145
  },
  {
    "id": "appetisers-chana-dal-masala",
    "category": "Appetisers",
    "sub": "",
    "name": "Chana Dal Masala",
    "price": 150
  },
  {
    "id": "appetisers-sweet-potato-chaat",
    "category": "Appetisers",
    "sub": "",
    "name": "Sweet Potato Chaat",
    "price": 125
  },
  {
    "id": "soups-hot-sour-soup-veg",
    "category": "Soups",
    "sub": "",
    "name": "Hot & Sour Soup (Veg)",
    "price": 120
  },
  {
    "id": "soups-hot-sour-soup-non-veg",
    "category": "Soups",
    "sub": "",
    "name": "Hot & Sour Soup (Non-Veg)",
    "price": 160
  },
  {
    "id": "soups-tomato-soup",
    "category": "Soups",
    "sub": "",
    "name": "Tomato Soup",
    "price": 120
  },
  {
    "id": "soups-sweet-corn-soup-veg",
    "category": "Soups",
    "sub": "",
    "name": "Sweet Corn Soup (Veg)",
    "price": 120
  },
  {
    "id": "soups-sweet-corn-soup-non-veg",
    "category": "Soups",
    "sub": "",
    "name": "Sweet Corn Soup (Non-Veg)",
    "price": 160
  },
  {
    "id": "maggi-wala-maggie-masala",
    "category": "Maggi Wala",
    "sub": "",
    "name": "Maggie Masala",
    "price": 50
  },
  {
    "id": "maggi-wala-veg-maggie",
    "category": "Maggi Wala",
    "sub": "",
    "name": "Veg Maggie",
    "price": 60
  },
  {
    "id": "maggi-wala-egg-maggie",
    "category": "Maggi Wala",
    "sub": "",
    "name": "Egg Maggie",
    "price": 80
  },
  {
    "id": "barbeque-paneer-tikka",
    "category": "Barbeque",
    "sub": "",
    "name": "Paneer Tikka",
    "price": 0
  },
  {
    "id": "barbeque-mushroom-tikka",
    "category": "Barbeque",
    "sub": "",
    "name": "Mushroom Tikka",
    "price": 0
  },
  {
    "id": "barbeque-chicken-tikka",
    "category": "Barbeque",
    "sub": "",
    "name": "Chicken Tikka",
    "price": 0
  },
  {
    "id": "natural-products-desi-ghee",
    "category": "Natural Products",
    "sub": "",
    "name": "Desi Ghee",
    "price": 0
  },
  {
    "id": "natural-products-wheat-grass",
    "category": "Natural Products",
    "sub": "",
    "name": "Wheat Grass",
    "price": 0
  },
  {
    "id": "natural-products-peanut-butter-classic",
    "category": "Natural Products",
    "sub": "",
    "name": "Peanut Butter - Classic",
    "price": 0
  },
  {
    "id": "natural-products-peanut-butter-almond-crunch",
    "category": "Natural Products",
    "sub": "",
    "name": "Peanut Butter - Almond Crunch",
    "price": 0
  },
  {
    "id": "natural-products-peanut-butter-natural",
    "category": "Natural Products",
    "sub": "",
    "name": "Peanut Butter - Natural",
    "price": 0
  },
  {
    "id": "natural-products-peanut-butter-dark-chocolate",
    "category": "Natural Products",
    "sub": "",
    "name": "Peanut Butter - Dark Chocolate",
    "price": 0
  },
  {
    "id": "breakfast-buffet-veg",
    "category": "Buffets & Thalis",
    "sub": "Poori Sabji, Chole Bhature, Poha, Daliya / Vermicelli, Tea",
    "name": "Breakfast Buffet (Veg)",
    "price": 500,
    "unit": "per person"
  },
  {
    "id": "breakfast-buffet-with-egg",
    "category": "Buffets & Thalis",
    "sub": "Poori Sabji, Chole Bhature, Poha, Daliya / Vermicelli, Tea, Omelette (2 eggs per person)",
    "name": "Breakfast Buffet (With Egg)",
    "price": 600,
    "unit": "per person"
  },
  {
    "id": "lunch-buffet-veg",
    "category": "Buffets & Thalis",
    "sub": "Roti, Sabji, Dal, Salad, Paneer / Kofta, Gulab Jamun / Halwa / Ice Cream",
    "name": "Lunch Buffet (Veg)",
    "price": 500,
    "unit": "per person"
  },
  {
    "id": "lunch-buffet-non-veg",
    "category": "Buffets & Thalis",
    "sub": "Dal, Seasonal Vegetable, Raita, Roti, Paneer, Chicken",
    "name": "Lunch Buffet (Non-Veg)",
    "price": 650,
    "unit": "per person"
  },
  {
    "id": "dinner-buffet-veg",
    "category": "Buffets & Thalis",
    "sub": "Roti, Sabji, Dal, Sweet Dish",
    "name": "Dinner Buffet (Veg)",
    "price": 500,
    "unit": "per person"
  },
  {
    "id": "dinner-buffet-non-veg",
    "category": "Buffets & Thalis",
    "sub": "Dal, Seasonal Veg, Dum Aloo, Roti, Paneer",
    "name": "Dinner Buffet (Non-Veg)",
    "price": 650,
    "unit": "per person"
  },
  {
    "id": "pahari-thali",
    "category": "Buffets & Thalis",
    "sub": "Chainsoo, Phaanu, Mandua Roti, Aloo Ke Gutke, Bhaang Ki Chutney, Aarhar ki daal, mooli ki thechwani (seasonal)",
    "name": "Pahari Thali",
    "price": 600,
    "unit": "per person"
  },
  {
    "id": "barbeque-setup",
    "category": "Barbeque",
    "sub": "Setup fee",
    "name": "Barbeque Setup",
    "price": 500,
    "unit": "per day"
  }
];
