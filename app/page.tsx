export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold text-foreground">Welcome to Feedback Fusion</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A platform for users to suggest and vote on features. Help shape the future of our product.
        </p>
      </section>
      
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold mb-2 text-blue-900 dark:text-blue-100">Submit Ideas</h2>
          <p className="text-blue-700 dark:text-blue-300">Share your feature requests and suggestions with the community.</p>
        </div>
        <div className="p-6 border rounded-lg bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <h2 className="text-2xl font-semibold mb-2 text-purple-900 dark:text-purple-100">Vote & Discuss</h2>
          <p className="text-purple-700 dark:text-purple-300">Support ideas you love and engage in meaningful discussions.</p>
        </div>
        <div className="p-6 border rounded-lg bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-semibold mb-2 text-green-900 dark:text-green-100">Track Progress</h2>
          <p className="text-green-700 dark:text-green-300">Follow the roadmap and see your ideas come to life.</p>
        </div>
      </section>
    </div>
  );
}
