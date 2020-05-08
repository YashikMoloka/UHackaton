export const con_adm = {
  carbonOxide: -1,
  nitrogenOxide: -1,
  nitrogenDioxide: -1,
  sulphurDioxide: -1,
  ozon: -1,
  pm10: -1,
  pm25: -1,
};

export const con_vas = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.5,
  ozon: 2.1,
  pm25: 0.1,
  sulphurDioxide: -1,
  pm10: -1,
};

export const con_vib = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.3,
  pm10: 0.1,
  sulphurDioxide: -1,
  ozon: -1,
  pm25: -1,
};


export const con_kal = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.3,
  ozon: 2.1,
  pm10: 0.1,
  sulphurDioxide: -1,
  pm25: -1,
};


export const con_kir = {
  carbonOxide: 0.1,
  nitrogenOxide: 0.2,
  nitrogenDioxide: 1.3,
  sulphurDioxide: 0.2,
  pm10: 0,
  ozon: -1,
  pm25: -1,
};


export const con_kol = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.5,
  sulphurDioxide: -1,
  ozon: 1.5,
  pm10: 0.1,
  pm25: -1,
};

export const con_kr = {
  carbonOxide: 0.1,
  nitrogenOxide: 0.1,
  nitrogenDioxide: 0.3,
  sulphurDioxide: 0,
  pm10: 0,
  ozon: -1,
  pm25: -1,
};

export const con_krs = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.3,
  ozon: 2.2,
  pm10: 0.1,
  sulphurDioxide: -1,
  pm25: -1,
};


export const con_krsh = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.3,
  sulphurDioxide: 0,
  ozon: 1.7,
  pm25: 0.2,
  pm10: -1,
};

export const con_kur = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.2,
  ozon: 2.1,
  pm25: 0.1,
  sulphurDioxide: -1,
  pm10: -1,
};

export const con_mos = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.6,
  sulphurDioxide: 0.1,
  pm25: 0,
  ozon: -1,
  pm10: -1,
};

export const con_nev = {
  carbonOxide: 0.1,
  nitrogenOxide: 0.1,
  nitrogenDioxide: 0.7,
  sulphurDioxide: 0,
  pm10: 0.1,
  ozon: -1,
  pm25: -1,
};

export const con_petr = {
  carbonOxide: 0.1,
  nitrogenOxide: 0.1,
  nitrogenDioxide: 0.3,
  sulphurDioxide: 0,
  pm25: 0.1,
  ozon: -1,
  pm10: -1,
};


export const con_petrd = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.2,
  sulphurDioxide: 0,
  pm10: 0.3,
  ozon: -1,
  pm25: -1,
};

export const con_prim = {
  carbonOxide: 0.1,
  nitrogenOxide: 0.1,
  nitrogenDioxide: 0.4,
  sulphurDioxide: 0,
  ozon: 2.3,
  pm10: 0.1,
  pm25: -1,
};

export const con_push = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.4,
  ozon: 1.3,
  pm10: 0.1,
  sulphurDioxide: -1,
  pm25: -1,
};

export const con_fruz = {
  carbonOxide: 0.1,
  nitrogenOxide: 0.1,
  nitrogenDioxide: 1.1,
  sulphurDioxide: 0,
  ozon: 2.4,
  pm10: 0.1,
  pm25: -1,
};


export const con_cen = {
  carbonOxide: 0.1,
  nitrogenOxide: 0,
  nitrogenDioxide: 0.7,
  ozon: 1.4,
  pm10: 0.2,
  sulphurDioxide: -1,
  pm25: -1,
};

export function getDataFromArea(name: any) {
  switch (name) {
    case 'Адмиралтейский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_adm.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_adm.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_adm.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_adm.sulphurDioxide}`
      };
    case 'Приморский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_prim.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_prim.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_prim.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_prim.sulphurDioxide}`,
        ozon: `Озон: ${con_prim.ozon}`,
        pm10: `Частицы PM10: ${con_prim.pm10}`
      };
    case 'Выборгский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_vib.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_vib.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_vib.nitrogenDioxide}`,
        pm10: `Частицы PM10: ${con_vib.pm10}`,
      };
    case 'Калининский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_kal.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_kal.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_kal.nitrogenDioxide}`,
        ozon: `Озон: ${con_kal.ozon}`,
        pm10: `Частицы PM10: ${con_kal.pm10}`,
      };
    case 'Московский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_mos.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_mos.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_mos.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_mos.sulphurDioxide}`,
      };
    case 'Красносельский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_krs.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_krs.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_krs.nitrogenDioxide}`,
        ozon: `Озон: ${con_krs.ozon}`,
        pm10: `Частицы PM10: ${con_krs.pm10}`,
      };
    case 'Невский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_nev.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_nev.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_nev.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_nev.sulphurDioxide}`,
        pm10: `Частицы PM10: ${con_nev.pm10}`,
      };
    case 'Фрунзенский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_fruz.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_fruz.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_fruz.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_fruz.sulphurDioxide}`,
        ozon: `Озон: ${con_fruz.ozon}`,
        pm10: `Частицы PM10: ${con_fruz.pm10}`,
      };
    case 'Кировский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_kir.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_kir.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_kir.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_kir.sulphurDioxide}`,
        pm10: `Частицы PM10: ${con_kir.pm10}`,
      };
    case 'Центральный район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_cen.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_cen.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_cen.nitrogenDioxide}`,
        ozon: `Озон: ${con_cen.ozon}`,
        pm10: `Частицы PM10: ${con_cen.pm10}`,
      };
    case 'Василеостровский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_vas.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_vas.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_vas.nitrogenDioxide}`,
        ozon: `Озон: ${con_vas.ozon}`,
        pm25: `Частицы PM2.5: ${con_vas.pm25}`
      };
    case 'Петроградский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_petr.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_petr.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_petr.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_petr.sulphurDioxide}`,
        pm25: `Частицы PM2.5: ${con_petr.pm25}`
      };
    case 'Красногвардейский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_kr.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_kr.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_kr.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_kr.sulphurDioxide}`,
        pm10: `Частицы PM10: ${con_kr.pm10}`,
      };
    case 'Колпинский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_kol.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_kol.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_kol.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_kol.sulphurDioxide}`,
        ozon: `Озон: ${con_kol.ozon}`,
        pm10: `Частицы PM10: ${con_kol.pm10}`,
      };
    case 'Кронштадтский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_krsh.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_krsh.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_krsh.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_krsh.sulphurDioxide}`,
        ozon: `Озон: ${con_krsh.ozon}`,
        pm25: `Частицы PM2.5: ${con_krsh.pm25}`
      };
    case 'Петродворцовый район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_petrd.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_petrd.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_petrd.nitrogenDioxide}`,
        sulphurDioxide: `Диоксид серы: ${con_petrd.sulphurDioxide}`,
        pm10: `Частицы PM10: ${con_petrd.pm10}`,
      };
    case 'Пушкинский район':
      return {
        name: name,
        carbonOxide: `Оксид углерода: ${con_push.carbonOxide}`,
        nitrogenOxide: `Оксид азота: ${con_push.nitrogenOxide}`,
        nitrogenDioxide: `Диоксид азота: ${con_push.nitrogenDioxide}`,
        ozon: `Озон: ${con_push.ozon}`,
        pm10: `Частицы PM10: ${con_push.pm10}`,
      };
    default:
      return { name: '123' };

  }
}
export function getValueFromString(str) {
  return +str.split(': ')[1];
}
