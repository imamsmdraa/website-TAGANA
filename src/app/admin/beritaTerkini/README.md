# Berita Terkini Module

Module untuk mengelola dan menampilkan berita terkini seputar bencana dan kegiatan TAGANA.

## 📁 Struktur Folder

```
beritaTerkini/
├── page.tsx                          # Halaman utama list berita
├── [id]/
│   └── page.tsx                      # Halaman kategori berita (dynamic route)
├── components/
│   ├── beritaList.tsx                # Main list component (legacy)
│   ├── BeritaCard.tsx                # Reusable card component (list & grid variant)
│   └── FilterSection.tsx             # Filter & search component
├── types/
│   └── index.ts                      # TypeScript types & interfaces
├── constants/
│   └── index.ts                      # Constants (kategori config, colors, etc)
├── utils/
│   └── helpers.ts                    # Helper functions
├── data/
│   └── dummy.ts                      # Dummy data (to be replaced with API)
└── hooks/
    └── useBeritaFilter.ts            # Custom hook for filtering logic
```

## 🎯 Fitur

- ✅ **Filter & Search**: Cari berita berdasarkan judul, status, dan kategori
- ✅ **5 Kategori Bencana**: Banjir, Longsor, Kebakaran, Gempa, Umum
- ✅ **Status Management**: Published & Draft
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Dynamic Routing**: Navigasi ke halaman kategori spesifik
- ✅ **Reusable Components**: Modular dan maintainable

## 🗂️ File Details

### **Types** (`types/index.ts`)

Mendefinisikan semua TypeScript types:

- `Status` - Status publikasi berita
- `Kategori` - Jenis kategori bencana
- `BeritaItem` - Interface untuk item berita
- `FilterState` - State untuk filter

### **Constants** (`constants/index.ts`)

Konfigurasi konstanta:

- `KATEGORI_CONFIG` - Konfigurasi setiap kategori (title, icon, colors)
- `STATUS_BADGE` - Warna badge untuk status
- `KATEGORI_LIST` - Array list kategori

### **Utils** (`utils/helpers.ts`)

Helper functions:

- `getStatusBadge()` - Get CSS classes untuk status badge
- `getKategoriBadge()` - Get CSS classes untuk kategori badge
- `getKategoriIcon()` - Get icon untuk kategori
- `getKategoriTitle()` - Get title untuk kategori
- `formatDate()` - Format tanggal
- `truncateText()` - Truncate text

### **Data** (`data/dummy.ts`)

Dummy data untuk development:

- `BERITA_DUMMY` - Array of berita items
- `getBeritaByKategori()` - Filter berita by kategori
- `getBeritaById()` - Get single berita by ID

### **Hooks** (`hooks/useBeritaFilter.ts`)

Custom hook untuk filtering:

- Manage filter state (search, status, kategori)
- Auto-filter dengan useMemo untuk performa
- Return filtered results

### **Components**

#### `BeritaCard.tsx`

Reusable card component dengan 2 variant:

- **List variant**: Horizontal card untuk list view
- **Grid variant**: Vertical card untuk grid view

Props:

```typescript
{
  berita: BeritaItem;
  onClick?: () => void;
  variant?: "list" | "grid";
}
```

#### `FilterSection.tsx`

Component untuk filter & search:

- Search bar dengan icon
- Status filter buttons
- Kategori filter buttons
- Result counter

## 🔄 Migration Guide

Untuk migrasi dari kode lama ke struktur baru:

### Sebelum:

```tsx
// Duplicate types di setiap file
type Status = "published" | "draft";
type Kategori = "banjir" | "longsor" | ...;

// Duplicate helper functions
const statusBadge = (status: Status) => { ... }
const kategoriBadge = (kategori: Kategori) => { ... }

// Hardcoded data
const beritaDummy = [ ... ]
```

### Sesudah:

```tsx
// Import dari central location
import { Status, Kategori, BeritaItem } from "../types";
import { getStatusBadge, getKategoriBadge } from "../utils/helpers";
import { BERITA_DUMMY } from "../data/dummy";
import { useBeritaFilter } from "../hooks/useBeritaFilter";

// Gunakan hook
const { filteredBerita, ... } = useBeritaFilter(BERITA_DUMMY);

// Gunakan component
<BeritaCard berita={item} variant="grid" onClick={...} />
```

## 🚀 Next Steps

1. **Replace dummy data** dengan fetch dari Supabase/API
2. **Implement detail page** untuk single berita
3. **Add CRUD operations** (Create, Update, Delete)
4. **Add pagination** untuk large dataset
5. **Implement image upload** untuk berita
6. **Add rich text editor** untuk konten berita

## 📝 Notes

- Semua helper functions sudah ter-centralized di `utils/helpers.ts`
- Types sudah shared across all files, tidak ada duplicate
- Constants mudah di-maintain di satu tempat
- Components reusable dan testable
- Custom hook memisahkan business logic dari UI

## 🎨 Styling

- Menggunakan Tailwind CSS
- Responsive breakpoints: mobile, tablet (sm:), desktop (md:, lg:, xl:)
- Color scheme konsisten per kategori
- Hover & active states untuk better UX
