/**
 * Deterministic vehicle image resolver.
 * Priority: brand+model exact match → brand match → color+type fallback → generic search
 */

const brandModelMap: Record<string, Record<string, string>> = {
  toyota: {
    innova: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
    fortuner: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    camry: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    corolla: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    supra: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=400&h=300&fit=crop",
    etios: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    glanza: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    urban: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
  },
  hyundai: {
    creta: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    i20: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    "grand i10": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    verna: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    venue: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    tucson: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    alcazar: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
  },
  honda: {
    city: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop",
    civic: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop",
    amaze: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    "wr-v": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    brv: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    jazz: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  },
  maruti: {
    swift: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    dzire: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    baleno: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    brezza: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    ertiga: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
    alto: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    wagon: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    ignis: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    ciaz: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  },
  "maruti suzuki": {
    swift: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    dzire: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    baleno: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    brezza: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    ertiga: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
  },
  suzuki: {
    swift: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    dzire: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    brezza: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
  },
  tata: {
    nexon: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    safari: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
    harrier: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
    tiago: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    tigor: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    punch: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    altroz: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    sumo: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
  },
  mahindra: {
    scorpio: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
    xuv500: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
    "xuv 500": "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
    bolero: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
    thar: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    xuv700: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
  },
  kia: {
    seltos: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    sonet: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    carnival: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
    carens: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
  },
  nissan: {
    "gt-r": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=300&fit=crop",
    magnite: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    kicks: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    sunny: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  },
  bmw: {
    "3 series": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    "5 series": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    x6: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop",
    x5: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop",
    m3: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    z4: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop",
  },
  mercedes: {
    "c-class": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
    "e-class": "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
    sls: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    gle: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop",
  },
  audi: {
    r8: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop",
    s4: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    a4: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    q7: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop",
  },
  ford: {
    mustang: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
    "f-150": "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop",
    ecosport: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
    endeavour: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
  },
  chevrolet: {
    corvette: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    camaro: "https://images.unsplash.com/photo-1603553329474-99f95f35394f?w=400&h=300&fit=crop",
    cruze: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  },
  ferrari: {
    "458": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
    california: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop",
  },
  porsche: {
    "911": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
    cayenne: "https://images.unsplash.com/photo-1606664949798-c7c8d6fa05a7?w=400&h=300&fit=crop",
  },
  lamborghini: {
    aventador: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    gallardo: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop",
  },
  tesla: {
    "model s": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    "model 3": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
  },
};

// Fallback by brand (generic brand image)
const brandFallback: Record<string, string> = {
  toyota: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
  hyundai: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  honda: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop",
  maruti: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  "maruti suzuki": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  suzuki: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  tata: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
  mahindra: "https://images.unsplash.com/photo-1593055357429-62b4c9e8f56d?w=400&h=300&fit=crop",
  kia: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
  nissan: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=300&fit=crop",
  bmw: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
  mercedes: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
  audi: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop",
  ford: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
  chevrolet: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
  ferrari: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
  porsche: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  lamborghini: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
  tesla: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
};

// Fallback by vehicle type
const typeFallback: Record<string, string> = {
  suv: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
  truck: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop",
  van: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=300&fit=crop",
  bike: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  sedan: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  hatchback: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  coupe: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
  car: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
};

export function getVehicleImage(brand: string, model?: string, vehicleType?: string): string {
  const b = brand?.toLowerCase().trim() || "";
  const m = model?.toLowerCase().trim() || "";
  const t = vehicleType?.toLowerCase().trim() || "";

  // 1. Exact brand + model match
  if (b && m && brandModelMap[b]) {
    // Try exact model key
    if (brandModelMap[b][m]) return brandModelMap[b][m];
    // Try partial model match
    for (const key of Object.keys(brandModelMap[b])) {
      if (m.includes(key) || key.includes(m)) return brandModelMap[b][key];
    }
  }

  // 2. Brand fallback
  if (b && brandFallback[b]) return brandFallback[b];

  // 3. Vehicle type fallback
  if (t && typeFallback[t]) return typeFallback[t];
  for (const key of Object.keys(typeFallback)) {
    if (t.includes(key)) return typeFallback[key];
  }

  // 4. Generic car
  return typeFallback["car"];
}
