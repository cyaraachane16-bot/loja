/**
 * Mapeia o nome do ficheiro para a categoria da loja.
 */
export function categoriaDoFicheiro(filename: string): string {
  const n = filename
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (/eletrodomesic|eletrodomest|geladeira|congelador|fogao|micro ondas|micro-ondas|televisao|ventilador|ferro de passar|ferro-de-passar|chaleira|cheleira|elequidificador|ar condicionado|ar-condicionado/.test(n)) {
    return 'Eletrodomésticos';
  }

  if (/mobilia|mobiliario|sofa|sofa|cama|mesa|armario|comoda|guarda roupa|guarda-roupa|guarda fato|estante|prateleira|espelho/.test(n)) {
    return 'Mobília';
  }

  if (/acessorios|celualar|celular/.test(n)) {
    return 'Celular e Acessórios';
  }
  if (/casa e decoracao|casa-decoracao/.test(n)) {
    return 'Casa & Decoração';
  }
  if (/finfatil|infantil/.test(n)) {
    return 'Infantil';
  }
  if (/langerie|lingerie|pijama/.test(n)) {
    return 'Lingerie e Pijamas';
  }
  if (/masculino/.test(n)) {
    return 'Roupas masculinas';
  }
  if (/roupa feininas|roupa femininas|femininas/.test(n)) {
    return 'Roupas femininas';
  }
  if (/sapatos|sapato/.test(n)) {
    return 'Sapatos';
  }
  if (/tops/.test(n)) {
    return 'Tops';
  }
  if (/mais vendidos|mais-vendidos/.test(n)) {
    return 'Mais Vendidos';
  }
  if (/envio nacional|envio-nacional/.test(n)) {
    return 'Envio Nacional';
  }
  if (/enchnt/.test(n)) {
    return 'Enchnt';
  }
  if (/travachic/.test(n)) {
    return 'TRAVACHIC';
  }
  if (/cyara\s*mod|cyara-mod/.test(n)) {
    return 'CYARA MOD';
  }
  if (/cyara/.test(n)) {
    return 'CYARA Trends';
  }
  if (/moda praia|praia|biquini/.test(n)) {
    return 'Moda praia';
  }
  if (/plus size|plus-size|tamanhos grandes/.test(n)) {
    return 'Tamanhos Grandes';
  }
  if (/vestido/.test(n)) {
    return 'Roupas femininas';
  }

  const modaFem = [
    'blazer',
    'blezer',
    'saia',
    'casaco',
    'macacao',
    'bota',
    'croped',
    'conjunto',
    'glamour',
    'coquette',
    'gola alta',
  ];
  if (modaFem.some((k) => n.includes(k))) {
    return 'Roupas femininas';
  }

  return 'Outros';
}

export const CATEGORIAS_LOJA = [
  'Roupas femininas',
  'Roupas masculinas',
  'Infantil',
  'Lingerie e Pijamas',
  'Tops',
  'Sapatos',
  'Eletrodomésticos',
  'Mobília',
  'Casa & Decoração',
  'Celular e Acessórios',
  'Moda praia',
  'CYARA Trends',
  'CYARA MOD',
  'Tamanhos Grandes',
] as const;
