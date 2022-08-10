import React, { useState } from 'react';
import items from './data';
import Menu from './Menu';
import Categories from './Categories';

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {

  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);


  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }

    const filteredItems = items.filter(item => item.category === category);
    setMenuItems(filteredItems);
  }

  return <main>
    <section class="menu section">
      <div class="title">
        <h2>Our Menu</h2>
        <div class="underline"></div>
      </div>
    </section>
    <Categories categories={categories} filterItems={filterItems} />
    <Menu items={ menuItems} />
  </main>
}

export default App;
