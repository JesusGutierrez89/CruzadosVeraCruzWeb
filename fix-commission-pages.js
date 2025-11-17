// Script temporal para arreglar páginas de comisiones
const fs = require('fs');
const path = require('path');

const commissions = [
  { folder: 'avituallamiento', name: 'avituallamiento', title: 'avituallamiento' },
  { folder: 'musica', name: 'musica', title: 'música' },
  { folder: 'historia', name: 'historia', title: 'historia' },
  { folder: 'diseno', name: 'diseno', title: 'diseño' },
  { folder: 'dinamizacion', name: 'dinamizacion', title: 'dinamización' },
  { folder: 'relaciones', name: 'relaciones', title: 'relaciones públicas' }
];

commissions.forEach(commission => {
  const filePath = path.join(__dirname, 'app', 'dashboard', 'info', commission.folder, 'page.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Corregir searchParams
    content = content.replace(
      /searchParams\?\: \{[\s\S]*?\}\;/,
      'searchParams?: Promise<{\n    q?: string;\n    action?: string;\n    id?: string;\n  }>;'
    );
    
    // Corregir uso de searchParams
    content = content.replace(
      /const query = searchParams\?\?q \|\| '';/,
      'const params = await searchParams;\n  const query = params?.q || \'\';'
    );
    
    // Corregir import
    content = content.replace(
      "import { getRecords } from '@/lib/data';",
      "import { getRecords } from '@/lib/firestore-data';"
    );
    
    // Corregir llamada a getRecords
    content = content.replace(
      'const records = await getRecords(query);',
      `const records = await getRecords(query, '${commission.name}');`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${commission.folder}/page.tsx`);
  }
});

console.log('All commission pages fixed!');