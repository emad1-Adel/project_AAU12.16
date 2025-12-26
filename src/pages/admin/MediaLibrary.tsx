import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Plus, Trash2, Image, FileText, Film, Music, 
  Search, Grid, List, Copy, Download, Eye,
  Folder, Calendar, HardDrive
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MediaFile {
  id: number;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video' | 'audio';
  size: string;
  uploadDate: string;
  category: string;
}

const initialMedia: MediaFile[] = [
  { id: 1, name: 'hero-campus.jpg', url: '/src/assets/hero-campus.jpg', type: 'image', size: '2.4 MB', uploadDate: '2025-01-10', category: 'الصور الرئيسية' },
  { id: 2, name: 'ngu-building.jpg', url: '/src/assets/ngu-building.jpg', type: 'image', size: '1.8 MB', uploadDate: '2025-01-08', category: 'المباني' },
  { id: 3, name: 'students-studying.jpg', url: '/src/assets/students-studying.jpg', type: 'image', size: '1.2 MB', uploadDate: '2025-01-05', category: 'الطلاب' },
  { id: 4, name: 'university-brochure.pdf', url: '#', type: 'document', size: '5.6 MB', uploadDate: '2025-01-03', category: 'الوثائق' },
  { id: 5, name: 'graduation-ceremony.mp4', url: '#', type: 'video', size: '45 MB', uploadDate: '2024-12-20', category: 'الفيديوهات' },
  { id: 6, name: 'university-anthem.mp3', url: '#', type: 'audio', size: '3.2 MB', uploadDate: '2024-12-15', category: 'الصوتيات' },
];

const categories = ['الصور الرئيسية', 'المباني', 'الطلاب', 'الفعاليات', 'الوثائق', 'الفيديوهات', 'الصوتيات', 'أخرى'];

export default function MediaLibrary() {
  const { t } = useLanguage();
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [uploadData, setUploadData] = useState({
    name: '',
    url: '',
    type: 'image' as MediaFile['type'],
    category: 'أخرى',
  });

  const getTypeIcon = (type: MediaFile['type']) => {
    const icons = { image: Image, document: FileText, video: Film, audio: Music };
    return icons[type];
  };

  const getTypeLabel = (type: MediaFile['type']) => {
    const labels = {
      image: { ar: 'صورة', en: 'Image' },
      document: { ar: 'مستند', en: 'Document' },
      video: { ar: 'فيديو', en: 'Video' },
      audio: { ar: 'صوت', en: 'Audio' },
    };
    return t(labels[type].ar, labels[type].en);
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleUpload = () => {
    if (!uploadData.name || !uploadData.url) {
      toast({ title: t('خطأ', 'Error'), description: t('يرجى ملء جميع الحقول', 'Please fill all fields'), variant: 'destructive' });
      return;
    }
    const newFile: MediaFile = {
      id: Date.now(),
      name: uploadData.name,
      url: uploadData.url,
      type: uploadData.type,
      size: '0 KB',
      uploadDate: new Date().toISOString().split('T')[0],
      category: uploadData.category,
    };
    setMedia([newFile, ...media]);
    setUploadData({ name: '', url: '', type: 'image', category: 'أخرى' });
    setIsUploadOpen(false);
    toast({ title: t('تم الرفع', 'Uploaded'), description: t('تم رفع الملف بنجاح', 'File uploaded successfully') });
  };

  const handleDelete = (id: number) => {
    setMedia(media.filter(m => m.id !== id));
    setSelectedFile(null);
    toast({ title: t('تم الحذف', 'Deleted'), description: t('تم حذف الملف', 'File deleted') });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: t('تم النسخ', 'Copied'), description: t('تم نسخ الرابط', 'URL copied to clipboard') });
  };

  const stats = {
    total: media.length,
    images: media.filter(m => m.type === 'image').length,
    documents: media.filter(m => m.type === 'document').length,
    videos: media.filter(m => m.type === 'video').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('مكتبة الوسائط', 'Media Library')}</h1>
          <p className="text-muted-foreground">{t('إدارة الصور والملفات والوسائط المتعددة', 'Manage images, files and multimedia')}</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />{t('رفع ملف', 'Upload File')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('رفع ملف جديد', 'Upload New File')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>{t('اسم الملف', 'File Name')}</Label>
                <Input value={uploadData.name} onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })} placeholder="image.jpg" />
              </div>
              <div className="space-y-2">
                <Label>{t('رابط الملف', 'File URL')}</Label>
                <Input value={uploadData.url} onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('النوع', 'Type')}</Label>
                  <Select value={uploadData.type} onValueChange={(value: MediaFile['type']) => setUploadData({ ...uploadData, type: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">{t('صورة', 'Image')}</SelectItem>
                      <SelectItem value="document">{t('مستند', 'Document')}</SelectItem>
                      <SelectItem value="video">{t('فيديو', 'Video')}</SelectItem>
                      <SelectItem value="audio">{t('صوت', 'Audio')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('التصنيف', 'Category')}</Label>
                  <Select value={uploadData.category} onValueChange={(value) => setUploadData({ ...uploadData, category: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>{t('إلغاء', 'Cancel')}</Button>
                <Button onClick={handleUpload}>{t('رفع', 'Upload')}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10"><HardDrive className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">{t('إجمالي الملفات', 'Total Files')}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/10"><Image className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.images}</p>
              <p className="text-sm text-muted-foreground">{t('صور', 'Images')}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-500/10"><FileText className="w-5 h-5 text-amber-500" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.documents}</p>
              <p className="text-sm text-muted-foreground">{t('مستندات', 'Documents')}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/10"><Film className="w-5 h-5 text-purple-500" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.videos}</p>
              <p className="text-sm text-muted-foreground">{t('فيديوهات', 'Videos')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder={t('بحث عن ملف...', 'Search files...')} 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40"><SelectValue placeholder={t('النوع', 'Type')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
            <SelectItem value="image">{t('صور', 'Images')}</SelectItem>
            <SelectItem value="document">{t('مستندات', 'Documents')}</SelectItem>
            <SelectItem value="video">{t('فيديوهات', 'Videos')}</SelectItem>
            <SelectItem value="audio">{t('صوتيات', 'Audio')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48"><SelectValue placeholder={t('التصنيف', 'Category')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
            {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex border rounded-md">
          <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}><Grid className="w-4 h-4" /></Button>
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}><List className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((file) => {
            const TypeIcon = getTypeIcon(file.type);
            return (
              <div 
                key={file.id} 
                className={`group relative bg-card rounded-lg border overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary ${selectedFile?.id === file.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedFile(file)}
              >
                <div className="aspect-square bg-muted flex items-center justify-center">
                  {file.type === 'image' ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <TypeIcon className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="secondary" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}>
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border bg-card divide-y">
          {filteredMedia.map((file) => {
            const TypeIcon = getTypeIcon(file.type);
            return (
              <div 
                key={file.id} 
                className={`flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer ${selectedFile?.id === file.id ? 'bg-muted/50' : ''}`}
                onClick={() => setSelectedFile(file)}
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0">
                  {file.type === 'image' ? (
                    <img src={file.url} alt="" className="w-full h-full object-cover rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <TypeIcon className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Folder className="w-3 h-3" />{file.category}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{file.uploadDate}</span>
                    <span>{file.size}</span>
                  </div>
                </div>
                <Badge variant="outline">{getTypeLabel(file.type)}</Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copyUrl(file.url); }}><Copy className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Panel */}
      {selectedFile && (
        <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedFile.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedFile.type === 'image' && (
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img src={selectedFile.url} alt={selectedFile.name} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">{t('النوع:', 'Type:')}</span> {getTypeLabel(selectedFile.type)}</div>
                <div><span className="text-muted-foreground">{t('الحجم:', 'Size:')}</span> {selectedFile.size}</div>
                <div><span className="text-muted-foreground">{t('التصنيف:', 'Category:')}</span> {selectedFile.category}</div>
                <div><span className="text-muted-foreground">{t('تاريخ الرفع:', 'Upload Date:')}</span> {selectedFile.uploadDate}</div>
              </div>
              <div className="space-y-2">
                <Label>{t('رابط الملف', 'File URL')}</Label>
                <div className="flex gap-2">
                  <Input value={selectedFile.url} readOnly />
                  <Button variant="outline" onClick={() => copyUrl(selectedFile.url)}><Copy className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="destructive" onClick={() => handleDelete(selectedFile.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />{t('حذف', 'Delete')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}