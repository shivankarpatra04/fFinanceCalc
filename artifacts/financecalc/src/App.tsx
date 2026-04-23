import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { HomePage } from "@/pages/Home";
import { CategoryPage } from "@/pages/CategoryPage";
import { CalculatorPage } from "@/pages/CalculatorPage";
import { BlogListPage } from "@/pages/BlogList";
import { BlogPostPage } from "@/pages/BlogPost";
import { AboutPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage } from "@/pages/static";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/blog" component={BlogListPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPage} />
      <Route path="/terms-of-service" component={TermsPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      {categories.map((c) => (
        <Route key={c.slug} path={`/${c.slug}`} component={CategoryPage} />
      ))}
      {calculators.map((c) => (
        <Route key={c.slug} path={`/${c.slug}`} component={CalculatorPage} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <WouterRouter>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
