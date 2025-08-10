"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Download } from "lucide-react";
import FAQ from "@/components/ui/FAQ";
import AdBanner from "@/components/ads/AdBanner";

const faqs = [
  {
    "question": "What is the Periodic Table?",
    "answer": "The periodic table is a chart that organizes all known chemical elements based on their atomic number, electron configuration, and recurring chemical properties."
  },
  {
    "question": "How are elements arranged in the periodic table?",
    "answer": "Elements are arranged in rows (periods) and columns (groups) according to increasing atomic number. Elements in the same group share similar chemical properties."
  },
  {
    "question": "What are the main categories of elements?",
    "answer": "The main categories include metals, nonmetals, and metalloids. They can also be divided into groups such as alkali metals, alkaline earth metals, transition metals, halogens, and noble gases."
  },
  {
    "question": "How do I use this interactive periodic table?",
    "answer": "Hover over an element to zoom in for a better view. Click on it to see detailed information displayed below the table."
  },
  {
    "question": "Why do some elements have different colors?",
    "answer": "Colors are used to represent different categories or types of elements, such as metals, nonmetals, and noble gases."
  },
  {
    "question": "What information is shown when I click an element?",
    "answer": "When you click an element, you can see details such as its atomic number, symbol, name, atomic mass, category, and electron configuration."
  },
  {
    "question": "Can I search for an element?",
    "answer": "Yes, you can use the search bar to quickly find any element by name, symbol, or atomic number."
  },
  {
    "question": "Who invented the periodic table?",
    "answer": "The modern periodic table is based on the work of Dmitri Mendeleev, a Russian chemist who first published it in 1869."
  }
]

const CATEGORY_COLORS = {
  "alkali metal": "bg-amber-200 text-amber-900",
  "alkaline earth metal": "bg-yellow-200 text-yellow-900",
  "lanthanoid": "bg-indigo-200 text-indigo-900",
  "actinoid": "bg-violet-200 text-violet-900",
  "transition metal": "bg-slate-200 text-slate-900",
  "post-transition metal": "bg-emerald-200 text-emerald-900",
  metalloid: "bg-rose-200 text-rose-900",
  nonmetal: "bg-cyan-200 text-cyan-900",
  halogen: "bg-pink-200 text-pink-900",
  "noble gas": "bg-blue-200 text-blue-900",
  default: "bg-gray-200 text-gray-900",
};

const ELEMENTS = [
  { number: 1, symbol: "H", name: "Hydrogen", atomicMass: "1.008", group: "nonmetal", period: 1, xpos: 1, ypos: 1, category: "nonmetal", electronConfig: "1s1", summary: "Lightest element, gas at STP.", state: "gas" },
  { number: 2, symbol: "He", name: "Helium", atomicMass: "4.0026", group: "noble gas", period: 1, xpos: 18, ypos: 1, category: "noble gas", electronConfig: "1s2", summary: "Noble gas; inert.", state: "gas" },

  { number: 3, symbol: "Li", name: "Lithium", atomicMass: "6.94", group: "alkali metal", period: 2, xpos: 1, ypos: 2, category: "alkali metal", electronConfig: "[He] 2s1", summary: "Soft reactive metal.", state: "solid" },
  { number: 4, symbol: "Be", name: "Beryllium", atomicMass: "9.0122", group: "alkaline earth metal", period: 2, xpos: 2, ypos: 2, category: "alkaline earth metal", electronConfig: "[He] 2s2", summary: "Light, stiff metal.", state: "solid" },
  { number: 5, symbol: "B", name: "Boron", atomicMass: "10.81", group: "metalloid", period: 2, xpos: 13, ypos: 2, category: "metalloid", electronConfig: "[He] 2s2 2p1", summary: "Metalloid used in glass.", state: "solid" },
  { number: 6, symbol: "C", name: "Carbon", atomicMass: "12.011", group: "nonmetal", period: 2, xpos: 14, ypos: 2, category: "nonmetal", electronConfig: "[He] 2s2 2p2", summary: "Basis of organic chemistry.", state: "solid" },
  { number: 7, symbol: "N", name: "Nitrogen", atomicMass: "14.007", group: "nonmetal", period: 2, xpos: 15, ypos: 2, category: "nonmetal", electronConfig: "[He] 2s2 2p3", summary: "Major air component.", state: "gas" },
  { number: 8, symbol: "O", name: "Oxygen", atomicMass: "15.999", group: "nonmetal", period: 2, xpos: 16, ypos: 2, category: "nonmetal", electronConfig: "[He] 2s2 2p4", summary: "Supports respiration.", state: "gas" },
  { number: 9, symbol: "F", name: "Fluorine", atomicMass: "18.998", group: "halogen", period: 2, xpos: 17, ypos: 2, category: "halogen", electronConfig: "[He] 2s2 2p5", summary: "Highly reactive halogen.", state: "gas" },
  { number: 10, symbol: "Ne", name: "Neon", atomicMass: "20.180", group: "noble gas", period: 2, xpos: 18, ypos: 2, category: "noble gas", electronConfig: "[He] 2s2 2p6", summary: "Used in signs.", state: "gas" },

  { number: 11, symbol: "Na", name: "Sodium", atomicMass: "22.990", group: "alkali metal", period: 3, xpos: 1, ypos: 3, category: "alkali metal", electronConfig: "[Ne] 3s1", summary: "Reactive metal, salt component.", state: "solid" },
  { number: 12, symbol: "Mg", name: "Magnesium", atomicMass: "24.305", group: "alkaline earth metal", period: 3, xpos: 2, ypos: 3, category: "alkaline earth metal", electronConfig: "[Ne] 3s2", summary: "Light metal; alloys.", state: "solid" },
  { number: 13, symbol: "Al", name: "Aluminium", atomicMass: "26.982", group: "post-transition metal", period: 3, xpos: 13, ypos: 3, category: "post-transition metal", electronConfig: "[Ne] 3s2 3p1", summary: "Light, corrosion-resistant metal.", state: "solid" },
  { number: 14, symbol: "Si", name: "Silicon", atomicMass: "28.085", group: "metalloid", period: 3, xpos: 14, ypos: 3, category: "metalloid", electronConfig: "[Ne] 3s2 3p2", summary: "Semiconductor core to electronics.", state: "solid" },
  { number: 15, symbol: "P", name: "Phosphorus", atomicMass: "30.974", group: "nonmetal", period: 3, xpos: 15, ypos: 3, category: "nonmetal", electronConfig: "[Ne] 3s2 3p3", summary: "Vital for life (DNA, ATP).", state: "solid" },
  { number: 16, symbol: "S", name: "Sulfur", atomicMass: "32.06", group: "nonmetal", period: 3, xpos: 16, ypos: 3, category: "nonmetal", electronConfig: "[Ne] 3s2 3p4", summary: "Used in fertilizers, sulfuric acid.", state: "solid" },
  { number: 17, symbol: "Cl", name: "Chlorine", atomicMass: "35.45", group: "halogen", period: 3, xpos: 17, ypos: 3, category: "halogen", electronConfig: "[Ne] 3s2 3p5", summary: "Disinfectant gas.", state: "gas" },
  { number: 18, symbol: "Ar", name: "Argon", atomicMass: "39.948", group: "noble gas", period: 3, xpos: 18, ypos: 3, category: "noble gas", electronConfig: "[Ne] 3s2 3p6", summary: "Inert gas used in lighting.", state: "gas" },

  { number: 19, symbol: "K", name: "Potassium", atomicMass: "39.098", group: "alkali metal", period: 4, xpos: 1, ypos: 4, category: "alkali metal", electronConfig: "[Ar] 4s1", summary: "Essential nutrient; reactive.", state: "solid" },
  { number: 20, symbol: "Ca", name: "Calcium", atomicMass: "40.078", group: "alkaline earth metal", period: 4, xpos: 2, ypos: 4, category: "alkaline earth metal", electronConfig: "[Ar] 4s2", summary: "Bone mineral; construction material.", state: "solid" },
  { number: 21, symbol: "Sc", name: "Scandium", atomicMass: "44.956", group: "transition metal", period: 4, xpos: 3, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d1 4s2", summary: "Light rare transition metal.", state: "solid" },
  { number: 22, symbol: "Ti", name: "Titanium", atomicMass: "47.867", group: "transition metal", period: 4, xpos: 4, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d2 4s2", summary: "Strong, corrosion-resistant.", state: "solid" },
  { number: 23, symbol: "V", name: "Vanadium", atomicMass: "50.942", group: "transition metal", period: 4, xpos: 5, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d3 4s2", summary: "Alloying element.", state: "solid" },
  { number: 24, symbol: "Cr", name: "Chromium", atomicMass: "51.996", group: "transition metal", period: 4, xpos: 6, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d5 4s1", summary: "Stainless steel component.", state: "solid" },
  { number: 25, symbol: "Mn", name: "Manganese", atomicMass: "54.938", group: "transition metal", period: 4, xpos: 7, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d5 4s2", summary: "Steelmaking alloy.", state: "solid" },
  { number: 26, symbol: "Fe", name: "Iron", atomicMass: "55.845", group: "transition metal", period: 4, xpos: 8, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d6 4s2", summary: "Main steel metal.", state: "solid" },
  { number: 27, symbol: "Co", name: "Cobalt", atomicMass: "58.933", group: "transition metal", period: 4, xpos: 9, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d7 4s2", summary: "Magnetic alloys.", state: "solid" },
  { number: 28, symbol: "Ni", name: "Nickel", atomicMass: "58.693", group: "transition metal", period: 4, xpos: 10, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d8 4s2", summary: "Stainless steel.", state: "solid" },
  { number: 29, symbol: "Cu", name: "Copper", atomicMass: "63.546", group: "transition metal", period: 4, xpos: 11, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d10 4s1", summary: "Conductive metal.", state: "solid" },
  { number: 30, symbol: "Zn", name: "Zinc", atomicMass: "65.38", group: "transition metal", period: 4, xpos: 12, ypos: 4, category: "transition metal", electronConfig: "[Ar] 3d10 4s2", summary: "Galvanizing metal.", state: "solid" },
  { number: 31, symbol: "Ga", name: "Gallium", atomicMass: "69.723", group: "post-transition metal", period: 4, xpos: 13, ypos: 4, category: "post-transition metal", electronConfig: "[Ar] 3d10 4s2 4p1", summary: "Low-melting metal.", state: "solid" },
  { number: 32, symbol: "Ge", name: "Germanium", atomicMass: "72.630", group: "metalloid", period: 4, xpos: 14, ypos: 4, category: "metalloid", electronConfig: "[Ar] 3d10 4s2 4p2", summary: "Semiconductor.", state: "solid" },
  { number: 33, symbol: "As", name: "Arsenic", atomicMass: "74.922", group: "metalloid", period: 4, xpos: 15, ypos: 4, category: "metalloid", electronConfig: "[Ar] 3d10 4s2 4p3", summary: "Toxic metalloid.", state: "solid" },
  { number: 34, symbol: "Se", name: "Selenium", atomicMass: "78.971", group: "nonmetal", period: 4, xpos: 16, ypos: 4, category: "nonmetal", electronConfig: "[Ar] 3d10 4s2 4p4", summary: "Photovoltaic uses.", state: "solid" },
  { number: 35, symbol: "Br", name: "Bromine", atomicMass: "79.904", group: "halogen", period: 4, xpos: 17, ypos: 4, category: "halogen", electronConfig: "[Ar] 3d10 4s2 4p5", summary: "Volatile red-brown liquid.", state: "liquid" },
  { number: 36, symbol: "Kr", name: "Krypton", atomicMass: "83.798", group: "noble gas", period: 4, xpos: 18, ypos: 4, category: "noble gas", electronConfig: "[Ar] 3d10 4s2 4p6", summary: "Inert gas used in lighting.", state: "gas" },

  { number: 37, symbol: "Rb", name: "Rubidium", atomicMass: "85.468", group: "alkali metal", period: 5, xpos: 1, ypos: 5, category: "alkali metal", electronConfig: "[Kr] 5s1", summary: "Soft, reactive metal.", state: "solid" },
  { number: 38, symbol: "Sr", name: "Strontium", atomicMass: "87.62", group: "alkaline earth metal", period: 5, xpos: 2, ypos: 5, category: "alkaline earth metal", electronConfig: "[Kr] 5s2", summary: "Used in fireworks.", state: "solid" },
  { number: 39, symbol: "Y", name: "Yttrium", atomicMass: "88.906", group: "transition metal", period: 5, xpos: 3, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d1 5s2", summary: "Rare transition metal.", state: "solid" },
  { number: 40, symbol: "Zr", name: "Zirconium", atomicMass: "91.224", group: "transition metal", period: 5, xpos: 4, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d2 5s2", summary: "Corrosion-resistant.", state: "solid" },
  { number: 41, symbol: "Nb", name: "Niobium", atomicMass: "92.906", group: "transition metal", period: 5, xpos: 5, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d4 5s1", summary: "Superalloys.", state: "solid" },
  { number: 42, symbol: "Mo", name: "Molybdenum", atomicMass: "95.95", group: "transition metal", period: 5, xpos: 6, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d5 5s1", summary: "Alloy strengthener.", state: "solid" },
  { number: 43, symbol: "Tc", name: "Technetium", atomicMass: "(98)", group: "transition metal", period: 5, xpos: 7, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d5 5s2", summary: "Radioactive; medical tracers.", state: "solid" },
  { number: 44, symbol: "Ru", name: "Ruthenium", atomicMass: "101.07", group: "transition metal", period: 5, xpos: 8, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d7 5s1", summary: "Catalyst uses.", state: "solid" },
  { number: 45, symbol: "Rh", name: "Rhodium", atomicMass: "102.91", group: "transition metal", period: 5, xpos: 9, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d8 5s1", summary: "Catalytic converters.", state: "solid" },
  { number: 46, symbol: "Pd", name: "Palladium", atomicMass: "106.42", group: "transition metal", period: 5, xpos: 10, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d10 5s0", summary: "Catalyst; electronics.", state: "solid" },
  { number: 47, symbol: "Ag", name: "Silver", atomicMass: "107.87", group: "transition metal", period: 5, xpos: 11, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d10 5s1", summary: "Conductive, decorative metal.", state: "solid" },
  { number: 48, symbol: "Cd", name: "Cadmium", atomicMass: "112.41", group: "transition metal", period: 5, xpos: 12, ypos: 5, category: "transition metal", electronConfig: "[Kr] 4d10 5s2", summary: "Batteries, toxic.", state: "solid" },
  { number: 49, symbol: "In", name: "Indium", atomicMass: "114.82", group: "post-transition metal", period: 5, xpos: 13, ypos: 5, category: "post-transition metal", electronConfig: "[Kr] 4d10 5s2 5p1", summary: "Soft, malleable metal.", state: "solid" },
  { number: 50, symbol: "Sn", name: "Tin", atomicMass: "118.71", group: "post-transition metal", period: 5, xpos: 14, ypos: 5, category: "post-transition metal", electronConfig: "[Kr] 4d10 5s2 5p2", summary: "Solder, alloys.", state: "solid" },
  { number: 51, symbol: "Sb", name: "Antimony", atomicMass: "121.76", group: "metalloid", period: 5, xpos: 15, ypos: 5, category: "metalloid", electronConfig: "[Kr] 4d10 5s2 5p3", summary: "Flame retardants, alloys.", state: "solid" },
  { number: 52, symbol: "Te", name: "Tellurium", atomicMass: "127.60", group: "metalloid", period: 5, xpos: 16, ypos: 5, category: "metalloid", electronConfig: "[Kr] 4d10 5s2 5p4", summary: "Semiconductor uses.", state: "solid" },
  { number: 53, symbol: "I", name: "Iodine", atomicMass: "126.90", group: "halogen", period: 5, xpos: 17, ypos: 5, category: "halogen", electronConfig: "[Kr] 4d10 5s2 5p5", summary: "Essential element for thyroid.", state: "solid" },
  { number: 54, symbol: "Xe", name: "Xenon", atomicMass: "131.29", group: "noble gas", period: 5, xpos: 18, ypos: 5, category: "noble gas", electronConfig: "[Kr] 4d10 5s2 5p6", summary: "Used in lighting & anesthesia.", state: "gas" },

  { number: 55, symbol: "Cs", name: "Cesium", atomicMass: "132.91", group: "alkali metal", period: 6, xpos: 1, ypos: 6, category: "alkali metal", electronConfig: "[Xe] 6s1", summary: "Very reactive soft metal.", state: "solid" },
  { number: 56, symbol: "Ba", name: "Barium", atomicMass: "137.33", group: "alkaline earth metal", period: 6, xpos: 2, ypos: 6, category: "alkaline earth metal", electronConfig: "[Xe] 6s2", summary: "Used in drilling fluids.", state: "solid" },

  // Lanthanides row (placed in separate row usually). We'll put them at ypos 8, xpos starting at 3 (common representation)
  { number: 57, symbol: "La", name: "Lanthanum", atomicMass: "138.91", group: "lanthanoid", period: 6, xpos: 3, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 5d1 6s2", summary: "Used in catalysts, optics.", state: "solid" },
  { number: 58, symbol: "Ce", name: "Cerium", atomicMass: "140.12", group: "lanthanoid", period: 6, xpos: 4, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f1 5d1 6s2", summary: "Polishing, catalysts.", state: "solid" },
  { number: 59, symbol: "Pr", name: "Praseodymium", atomicMass: "140.91", group: "lanthanoid", period: 6, xpos: 5, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f3 6s2", summary: "Magnets and alloys.", state: "solid" },
  { number: 60, symbol: "Nd", name: "Neodymium", atomicMass: "144.24", group: "lanthanoid", period: 6, xpos: 6, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f4 6s2", summary: "Strong permanent magnets.", state: "solid" },
  { number: 61, symbol: "Pm", name: "Promethium", atomicMass: "(145)", group: "lanthanoid", period: 6, xpos: 7, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f5 6s2", summary: "Radioactive; rare.", state: "solid" },
  { number: 62, symbol: "Sm", name: "Samarium", atomicMass: "150.36", group: "lanthanoid", period: 6, xpos: 8, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f6 6s2", summary: "Magnets, nuclear uses.", state: "solid" },
  { number: 63, symbol: "Eu", name: "Europium", atomicMass: "151.96", group: "lanthanoid", period: 6, xpos: 9, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f7 6s2", summary: "Phosphors (TVs).", state: "solid" },
  { number: 64, symbol: "Gd", name: "Gadolinium", atomicMass: "157.25", group: "lanthanoid", period: 6, xpos: 10, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f7 5d1 6s2", summary: "MRI contrast agent.", state: "solid" },
  { number: 65, symbol: "Tb", name: "Terbium", atomicMass: "158.93", group: "lanthanoid", period: 6, xpos: 11, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f9 6s2", summary: "Phosphors.", state: "solid" },
  { number: 66, symbol: "Dy", name: "Dysprosium", atomicMass: "162.50", group: "lanthanoid", period: 6, xpos: 12, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f10 6s2", summary: "Magnets, lasers.", state: "solid" },
  { number: 67, symbol: "Ho", name: "Holmium", atomicMass: "164.93", group: "lanthanoid", period: 6, xpos: 13, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f11 6s2", summary: "Magnets.", state: "solid" },
  { number: 68, symbol: "Er", name: "Erbium", atomicMass: "167.26", group: "lanthanoid", period: 6, xpos: 14, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f12 6s2", summary: "Lasers and fiber optics.", state: "solid" },
  { number: 69, symbol: "Tm", name: "Thulium", atomicMass: "168.93", group: "lanthanoid", period: 6, xpos: 15, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f13 6s2", summary: "Rare lanthanide.", state: "solid" },
  { number: 70, symbol: "Yb", name: "Ytterbium", atomicMass: "173.05", group: "lanthanoid", period: 6, xpos: 16, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f14 6s2", summary: "Electronic components.", state: "solid" },
  { number: 71, symbol: "Lu", name: "Lutetium", atomicMass: "174.97", group: "lanthanoid", period: 6, xpos: 17, ypos: 8, category: "lanthanoid", electronConfig: "[Xe] 4f14 5d1 6s2", summary: "Scant applications.", state: "solid" },

  // Continue period 6 main table after Ba
  { number: 72, symbol: "Hf", name: "Hafnium", atomicMass: "178.49", group: "transition metal", period: 6, xpos: 4, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d2 6s2", summary: "Nuclear control rods, alloys.", state: "solid" },
  { number: 73, symbol: "Ta", name: "Tantalum", atomicMass: "180.95", group: "transition metal", period: 6, xpos: 5, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d3 6s2", summary: "Electronics, capacitors.", state: "solid" },
  { number: 74, symbol: "W", name: "Tungsten", atomicMass: "183.84", group: "transition metal", period: 6, xpos: 6, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d4 6s2", summary: "Very high melting point.", state: "solid" },
  { number: 75, symbol: "Re", name: "Rhenium", atomicMass: "186.21", group: "transition metal", period: 6, xpos: 7, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d5 6s2", summary: "High-temp alloys.", state: "solid" },
  { number: 76, symbol: "Os", name: "Osmium", atomicMass: "190.23", group: "transition metal", period: 6, xpos: 8, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d6 6s2", summary: "Very dense metal.", state: "solid" },
  { number: 77, symbol: "Ir", name: "Iridium", atomicMass: "192.22", group: "transition metal", period: 6, xpos: 9, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d7 6s2", summary: "Hard, corrosion-resistant.", state: "solid" },
  { number: 78, symbol: "Pt", name: "Platinum", atomicMass: "195.08", group: "transition metal", period: 6, xpos: 10, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d9 6s1", summary: "Catalyst, jewelry.", state: "solid" },
  { number: 79, symbol: "Au", name: "Gold", atomicMass: "196.97", group: "transition metal", period: 6, xpos: 11, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d10 6s1", summary: "Noble metal; currency, jewelry.", state: "solid" },
  { number: 80, symbol: "Hg", name: "Mercury", atomicMass: "200.59", group: "transition metal", period: 6, xpos: 12, ypos: 6, category: "transition metal", electronConfig: "[Xe] 4f14 5d10 6s2", summary: "Liquid metal at STP; toxic.", state: "liquid" },
  { number: 81, symbol: "Tl", name: "Thallium", atomicMass: "204.38", group: "post-transition metal", period: 6, xpos: 13, ypos: 6, category: "post-transition metal", electronConfig: "[Xe] 4f14 5d10 6s2 6p1", summary: "Toxic metal.", state: "solid" },
  { number: 82, symbol: "Pb", name: "Lead", atomicMass: "207.2", group: "post-transition metal", period: 6, xpos: 14, ypos: 6, category: "post-transition metal", electronConfig: "[Xe] 4f14 5d10 6s2 6p2", summary: "Heavy toxic metal; batteries, shielding.", state: "solid" },
  { number: 83, symbol: "Bi", name: "Bismuth", atomicMass: "208.98", group: "post-transition metal", period: 6, xpos: 15, ypos: 6, category: "post-transition metal", electronConfig: "[Xe] 4f14 5d10 6s2 6p3", summary: "Low-tox alternative; cosmetics.", state: "solid" },
  { number: 84, symbol: "Po", name: "Polonium", atomicMass: "(209)", group: "metalloid", period: 6, xpos: 16, ypos: 6, category: "metalloid", electronConfig: "[Xe] 4f14 5d10 6s2 6p4", summary: "Radioactive; rare.", state: "solid" },
  { number: 85, symbol: "At", name: "Astatine", atomicMass: "(210)", group: "halogen", period: 6, xpos: 17, ypos: 6, category: "halogen", electronConfig: "[Xe] 4f14 5d10 6s2 6p5", summary: "Very rare and radioactive.", state: "solid" },
  { number: 86, symbol: "Rn", name: "Radon", atomicMass: "222", group: "noble gas", period: 6, xpos: 18, ypos: 6, category: "noble gas", electronConfig: "[Xe] 4f14 5d10 6s2 6p6", summary: "Radioactive gas (health hazard).", state: "gas" },

  // Period 7 start
  { number: 87, symbol: "Fr", name: "Francium", atomicMass: "(223)", group: "alkali metal", period: 7, xpos: 1, ypos: 7, category: "alkali metal", electronConfig: "[Rn] 7s1", summary: "Extremely rare and radioactive.", state: "solid" },
  { number: 88, symbol: "Ra", name: "Radium", atomicMass: "226", group: "alkaline earth metal", period: 7, xpos: 2, ypos: 7, category: "alkaline earth metal", electronConfig: "[Rn] 7s2", summary: "Highly radioactive.", state: "solid" },

  // Actinides row (placed row 9 xpos 3..17)
  { number: 89, symbol: "Ac", name: "Actinium", atomicMass: "227", group: "actinoid", period: 7, xpos: 3, ypos: 9, category: "actinoid", electronConfig: "[Rn] 6d1 7s2", summary: "Radioactive, rare.", state: "solid" },
  { number: 90, symbol: "Th", name: "Thorium", atomicMass: "232.04", group: "actinoid", period: 7, xpos: 4, ypos: 9, category: "actinoid", electronConfig: "[Rn] 6d2 7s2", summary: "Potential nuclear fuel.", state: "solid" },
  { number: 91, symbol: "Pa", name: "Protactinium", atomicMass: "231.04", group: "actinoid", period: 7, xpos: 5, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f2 6d1 7s2", summary: "Rare; radioactive.", state: "solid" },
  { number: 92, symbol: "U", name: "Uranium", atomicMass: "238.03", group: "actinoid", period: 7, xpos: 6, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f3 6d1 7s2", summary: "Nuclear fuel.", state: "solid" },
  { number: 93, symbol: "Np", name: "Neptunium", atomicMass: "(237)", group: "actinoid", period: 7, xpos: 7, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f4 6d1 7s2", summary: "Radioactive, synthetic.", state: "solid" },
  { number: 94, symbol: "Pu", name: "Plutonium", atomicMass: "(244)", group: "actinoid", period: 7, xpos: 8, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f6 7s2", summary: "Nuclear fuel/weapons.", state: "solid" },
  { number: 95, symbol: "Am", name: "Americium", atomicMass: "(243)", group: "actinoid", period: 7, xpos: 9, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f7 7s2", summary: "Smoke detectors (small amounts).", state: "solid" },
  { number: 96, symbol: "Cm", name: "Curium", atomicMass: "(247)", group: "actinoid", period: 7, xpos: 10, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f7 6d1 7s2", summary: "Radioactive, research use.", state: "solid" },
  { number: 97, symbol: "Bk", name: "Berkelium", atomicMass: "(247)", group: "actinoid", period: 7, xpos: 11, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f9 7s2", summary: "Synthetic, research.", state: "solid" },
  { number: 98, symbol: "Cf", name: "Californium", atomicMass: "(251)", group: "actinoid", period: 7, xpos: 12, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f10 7s2", summary: "Neutron sources.", state: "solid" },
  { number: 99, symbol: "Es", name: "Einsteinium", atomicMass: "(252)", group: "actinoid", period: 7, xpos: 13, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f11 7s2", summary: "Synthetic, research.", state: "solid" },
  { number: 100, symbol: "Fm", name: "Fermium", atomicMass: "(257)", group: "actinoid", period: 7, xpos: 14, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f12 7s2", summary: "Synthetic.", state: "solid" },
  { number: 101, symbol: "Md", name: "Mendelevium", atomicMass: "(258)", group: "actinoid", period: 7, xpos: 15, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f13 7s2", summary: "Synthetic.", state: "solid" },
  { number: 102, symbol: "No", name: "Nobelium", atomicMass: "(259)", group: "actinoid", period: 7, xpos: 16, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f14 7s2", summary: "Synthetic.", state: "solid" },
  { number: 103, symbol: "Lr", name: "Lawrencium", atomicMass: "(262)", group: "actinoid", period: 7, xpos: 17, ypos: 9, category: "actinoid", electronConfig: "[Rn] 5f14 7s2 7p1", summary: "Synthetic, very heavy.", state: "solid" },

  // Finish main period 7 after the lanth/actinoid set
  { number: 104, symbol: "Rf", name: "Rutherfordium", atomicMass: "(267)", group: "transition metal", period: 7, xpos: 4, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic transactinide.", state: "solid" },
  { number: 105, symbol: "Db", name: "Dubnium", atomicMass: "(268)", group: "transition metal", period: 7, xpos: 5, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 106, symbol: "Sg", name: "Seaborgium", atomicMass: "(269)", group: "transition metal", period: 7, xpos: 6, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 107, symbol: "Bh", name: "Bohrium", atomicMass: "(270)", group: "transition metal", period: 7, xpos: 7, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 108, symbol: "Hs", name: "Hassium", atomicMass: "(269)", group: "transition metal", period: 7, xpos: 8, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 109, symbol: "Mt", name: "Meitnerium", atomicMass: "(278)", group: "transition metal", period: 7, xpos: 9, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 110, symbol: "Ds", name: "Darmstadtium", atomicMass: "(281)", group: "transition metal", period: 7, xpos: 10, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 111, symbol: "Rg", name: "Roentgenium", atomicMass: "(282)", group: "transition metal", period: 7, xpos: 11, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 112, symbol: "Cn", name: "Copernicium", atomicMass: "(285)", group: "transition metal", period: 7, xpos: 12, ypos: 7, category: "transition metal", electronConfig: "unknown", summary: "Synthetic, very heavy.", state: "solid" },
  { number: 113, symbol: "Nh", name: "Nihonium", atomicMass: "(286)", group: "post-transition metal", period: 7, xpos: 13, ypos: 7, category: "post-transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 114, symbol: "Fl", name: "Flerovium", atomicMass: "(289)", group: "post-transition metal", period: 7, xpos: 14, ypos: 7, category: "post-transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 115, symbol: "Mc", name: "Moscovium", atomicMass: "(290)", group: "post-transition metal", period: 7, xpos: 15, ypos: 7, category: "post-transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 116, symbol: "Lv", name: "Livermorium", atomicMass: "(293)", group: "post-transition metal", period: 7, xpos: 16, ypos: 7, category: "post-transition metal", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 117, symbol: "Ts", name: "Tennessine", atomicMass: "(294)", group: "halogen", period: 7, xpos: 17, ypos: 7, category: "halogen", electronConfig: "unknown", summary: "Synthetic.", state: "solid" },
  { number: 118, symbol: "Og", name: "Oganesson", atomicMass: "(294)", group: "noble gas", period: 7, xpos: 18, ypos: 7, category: "noble gas", electronConfig: "unknown", summary: "Synthetic noble-gas-like element.", state: "solid" },
];

// Helper: map by position for rendering
const elementsMapByPos = (elements) => {
  const m = {};
  elements.forEach((el) => {
    const key = `${el.xpos}-${el.ypos}`;
    m[key] = el;
  });
  return m;
};

export default function Page() {
  const maxCols = 18; // groups
  const maxRows = 9; // include lanthanoid/actinoid rows
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [hoverPos, setHoverPos] = useState({ left: 0, top: 0 });
  const tableRef = useRef(null);

  const elementsByPosition = useMemo(() => elementsMapByPos(ELEMENTS), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ELEMENTS.filter(
      (el) =>
        !q ||
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase() === q ||
        String(el.number) === q
    );
  }, [query]);

  useEffect(() => {
    if (filtered.length === 1) setSelected(filtered[0]);
  }, [filtered]);

  const onMouseEnter = (el, e) => {
    setHovered(el);
    // position tooltip using bounding client rect so it's placed correctly
    const rect = e.currentTarget.getBoundingClientRect();
    // prefer above element if space available, else below
    const top = rect.top - 10; // will adjust in style - tooltip height
    const left = rect.left + rect.width / 2;
    setHoverPos({ left, top, rect });
  };

  const exportCSV = () => {
    const headers = ["number", "symbol", "name", "atomicMass", "group", "period", "category", "electronConfig", "state"];
    const rows = filtered.map((e) => headers.map((h) => JSON.stringify(e[h] ?? "")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "elements.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">Interactive Periodic Table</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Hover to zoom and preview (tooltip correctly positioned), click to open the bottom detail panel.
        </p>
      </div>
        <AdBanner position="middle" className="mb-8" />
        <div className="flex gap-3 mb-3 items-center">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, symbol, or atomic number"
              className="w-full px-4 py-2 border border-input rounded-lg bg-background pl-10"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
          </div>
          <button onClick={exportCSV} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

      <div className="h-[800px] bg-card rounded-lg border border-border p-4 mb-6 ">

        <div ref={tableRef}>
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${maxCols}, minmax(64px, 1fr))`,
              gridAutoRows: "72px",
            }}
          >
            {Array.from({ length: maxRows }).map((_, rowIdx) =>
              Array.from({ length: maxCols }).map((__, colIdx) => {
                const xpos = colIdx + 1;
                const ypos = rowIdx + 1;
                const key = `${xpos}-${ypos}`;
                const el = elementsByPosition[key];
                return (
                  <div key={key} className="p-0">
                    {el ? (
                      <button
                        onMouseEnter={(e) => onMouseEnter(el, e)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setSelected(el)}
                        className={`w-full h-full rounded-lg border border-border transform transition-transform duration-200 ease-in-out flex flex-col p-2 text-left focus:outline-none ${
                          (CATEGORY_COLORS[el.category] ?? CATEGORY_COLORS.default)
                        } ${hovered?.number === el.number ? "scale-110 z-30" : ""}`}
                        style={{ boxShadow: hovered?.number === el.number ? "0 10px 30px rgba(0,0,0,0.18)" : undefined }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="text-xs">{el.number}</div>
                          <div className="text-xl font-bold">{el.symbol}</div>
                        </div>
                        <div className="text-[11px] mt-1">{el.name}</div>
                        <div className="text-[10px] mt-auto">{el.atomicMass}</div>
                      </button>
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                );
              })
            )}
          </div>
          {hovered && (
            <div
              className="fixed z-50 w-56 p-3 bg-card border border-border rounded-lg shadow-lg pointer-events-none"
              style={{
                transform: "translate(-50%, -100%)",
                left: hoverPos.left || "50%",
                top: (hoverPos.rect ? Math.max(hoverPos.rect.top - 8, 8) : (hoverPos.top || 100)),
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">{hovered.symbol}</div>
                <div className="text-xs text-muted-foreground">{hovered.number}</div>
              </div>
              <div className="text-sm text-muted-foreground">{hovered.name}</div>
              <div className="mt-2 text-xs">{hovered.summary}</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom detail panel */}
      <div className={`fixed left-0 right-0 bottom-0 transition-transform duration-300 ${selected ? "translate-y-0" : "translate-y-full"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-card rounded-t-xl border border-border p-6 shadow-lg">
            <div className="flex gap-6 items-start">
              {selected ? (
                <>
                  <div className="w-36 h-36 rounded-lg flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-primary/20 to-primary/5">
                    {selected.symbol}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {selected.name} <span className="text-sm text-muted-foreground">({selected.symbol})</span>
                        </h2>
                        <div className="text-sm text-muted-foreground">
                          Atomic number {selected.number} • {selected.atomicMass}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">{selected.category}</div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Electron configuration</div>
                        <div className="font-medium">{selected.electronConfig || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Standard state</div>
                        <div className="font-medium">{selected.state || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Group</div>
                        <div className="font-medium">{selected.group || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Period</div>
                        <div className="font-medium">{selected.period || "—"}</div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">{selected.summary}</div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(selected, null, 2))}
                        className="px-4 py-2 bg-muted/20 rounded"
                      >
                        Copy JSON
                      </button>
                      <a
                        href={`https://en.wikipedia.org/wiki/${selected.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded"
                      >
                        More on Wikipedia
                      </a>
                      <button onClick={() => setSelected(null)} className="ml-auto px-4 py-2 bg-red-50 text-red-600 rounded">
                        Close
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full text-center text-muted-foreground">Select an element to view details</div>
              )}
            </div>
          </div>
        </div>
      </div>
       <AdBanner position="middle" className="mb-8" />
       <FAQ faqs={faqs} />
    </div>
  );
}
