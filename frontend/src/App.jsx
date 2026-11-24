import { BrowserRouter, Route, Routes } from "react-router-dom";
import OCRPage from "./feature/OCR/pages/OCRPage";
import BlogListPage from "./feature/Blog/pages/BlogListPage";
import BlogPostPage from "./feature/Blog/pages/BlogPostPage";
import UploadModePage from "./feature/OCR/pages/UploadModePage";
import { SiteLayout } from "./shared/components/SiteLayout";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadModePage />} />
        <Route path="/bangla-upload" element={<OCRPage mode="bangla" handwritingOnly />} />
        <Route path="/english-upload" element={<OCRPage mode="english" handwritingOnly />} />
        <Route path="/bangla-handwriting-ocr" element={<OCRPage mode="bangla" handwritingOnly />} />
        <Route element={<SiteLayout />}>
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
