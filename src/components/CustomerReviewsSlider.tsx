import React, { useState, useEffect, useRef } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, Sparkles, X, Send } from 'lucide-react';
import { Product } from '../types';

export interface CustomerReviewItem {
  id: string;
  name: string;
  roleOrLocation: string;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  avatarBg: string;
  initials: string;
  date: string;
  helpfulCount: number;
  userUpvoted?: boolean;
}

const INITIAL_REVIEWS: CustomerReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Tanvir Ahmed',
    roleOrLocation: 'Gulshan, Dhaka · Verified Buyer',
    rating: 5,
    title: 'Super fast delivery & 100% original product!',
    comment: 'Ordered the 65W GaN Charger and got it within 24 hours via express delivery in Dhaka. Packaging was premium and it charges my MacBook Pro and iPhone simultaneously without heating.',
    productName: 'FlexaGear 65W GaN Charger',
    avatarBg: 'from-blue-600 to-indigo-600',
    initials: 'TA',
    date: 'Yesterday',
    helpfulCount: 84,
  },
  {
    id: 'rev-2',
    name: 'Nusrat Jahan',
    roleOrLocation: 'Agrabad, Chattogram · Verified Buyer',
    rating: 5,
    title: 'Best ANC headphones in Bangladesh!',
    comment: 'The NoisePro ANC headphones are phenomenal. I received my parcel via Cash on Delivery in Chattogram within 2 days. Battery life is amazing and noise cancellation is top notch.',
    productName: 'NoisePro ANC Headphones',
    avatarBg: 'from-rose-500 to-pink-600',
    initials: 'NJ',
    date: '3 days ago',
    helpfulCount: 71,
  },
  {
    id: 'rev-3',
    name: 'Rahat Hossain',
    roleOrLocation: 'Zindabazar, Sylhet · Verified Buyer',
    rating: 5,
    title: 'Extremely reliable power bank',
    comment: 'PowerVolt 20,000mAh Power Bank is a lifesaver during load shedding. Genuine capacity, sturdy build, and fast charging support. Very satisfied with the COD experience.',
    productName: 'PowerVolt 20,000mAh Power Bank',
    avatarBg: 'from-emerald-600 to-teal-600',
    initials: 'RH',
    date: '5 days ago',
    helpfulCount: 56,
  },
  {
    id: 'rev-4',
    name: 'Farhan Sadique',
    roleOrLocation: 'Uttara, Dhaka · Verified Buyer',
    rating: 5,
    title: 'Smooth transaction & premium accessories',
    comment: 'The MagSafe wireless charger snaps instantly and looks sleek on my desk. Customer support on WhatsApp was very helpful when I inquired about delivery timing.',
    productName: 'MagSafe Wireless Charger',
    avatarBg: 'from-amber-500 to-orange-600',
    initials: 'FS',
    date: '1 week ago',
    helpfulCount: 49,
  },
  {
    id: 'rev-5',
    name: 'Sumaiya Akter',
    roleOrLocation: 'GEC Circle, Chattogram · Verified Buyer',
    rating: 5,
    title: 'LiteBuds Pro sound quality is crystal clear',
    comment: 'Sound clarity and bass on LiteBuds Pro are better than many expensive brands. Fast courier delivery and safe payment method. Will definitely order again!',
    productName: 'LiteBuds Pro True Wireless',
    avatarBg: 'from-purple-600 to-violet-600',
    initials: 'SA',
    date: '1 week ago',
    helpfulCount: 38,
  },
];

interface CustomerReviewsSliderProps {
  onSelectProductByName?: (productName: string) => void;
  products?: Product[];
}

export const CustomerReviewsSlider: React.FC<CustomerReviewsSliderProps> = ({
  onSelectProductByName,
}) => {
  const [reviews, setReviews] = useState<CustomerReviewItem[]>(INITIAL_REVIEWS);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Dhaka');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('FlexaGear 65W GaN Charger');

  // Auto-slide side-by-side marquee effect
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let animationFrameId: number;
    const speed = 0.8; // pixels per frame

    const step = () => {
      if (scroller) {
        scroller.scrollLeft += speed;
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleUpvote = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        const upvoted = r.userUpvoted;
        return {
          ...r,
          userUpvoted: !upvoted,
          helpfulCount: upvoted ? r.helpfulCount - 1 : r.helpfulCount + 1
        };
      }
      return r;
    }));
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim() || !newTitle.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const initials = newAuthor
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const gradients = [
      'from-blue-600 to-indigo-600',
      'from-purple-600 to-pink-600',
      'from-emerald-600 to-teal-600',
      'from-amber-500 to-orange-600'
    ];

    const newRev: CustomerReviewItem = {
      id: `rev-${Date.now()}`,
      name: newAuthor,
      roleOrLocation: `${newLocation} · Verified Buyer`,
      rating: Number(newRating),
      title: newTitle,
      comment: newComment,
      productName: newProduct,
      avatarBg: gradients[Math.floor(Math.random() * gradients.length)],
      initials: initials || 'GM',
      date: 'Just now',
      helpfulCount: 1,
      userUpvoted: true
    };

    setReviews([newRev, ...reviews]);
    setIsSubmittingReview(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    alert('Thank you! Your verified review has been published successfully.');
  };

  // Duplicate reviews array for seamless infinite marquee loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-600" /> Customer Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Real feedback from verified buyers across Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-black text-gray-900">4.9 / 5.0 Rating</div>
              <div className="text-[10px] text-gray-400 font-semibold">Based on 3,420+ reviews</div>
            </div>
            <button
              onClick={() => setIsSubmittingReview(true)}
              className="inline-flex items-center gap-1.5 bg-[#0a192f] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Auto-Sliding Marquee (Side-by-side, No rigid boxed grid cards) */}
      <div className="mt-8 relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-hidden whitespace-nowrap py-4 select-none px-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="shrink-0 w-[320px] sm:w-[380px] bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200/60 shadow-xs flex flex-col justify-between space-y-4 whitespace-normal"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Verified Buyer
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-gray-950 line-clamp-1">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shadow-xs`}>
                    {rev.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{rev.name}</div>
                    <div className="text-[10px] text-gray-400">{rev.roleOrLocation}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleUpvote(rev.id)}
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    rev.userUpvoted ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isSubmittingReview && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsSubmittingReview(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-xl font-black text-gray-950">Write a Verified Review</h3>
              <p className="text-xs text-gray-500 mt-1">Share your experience with Gadget Hub Mart products.</p>
            </div>

            <form onSubmit={handleAddReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Location / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gulshan, Dhaka"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rating (1-5)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-600"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Product</label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-600"
                >
                  <option value="FlexaGear 65W GaN Charger">FlexaGear 65W GaN Charger</option>
                  <option value="NoisePro ANC Headphones">NoisePro ANC Headphones</option>
                  <option value="PowerVolt 20,000mAh Power Bank">PowerVolt 20,000mAh Power Bank</option>
                  <option value="MagSafe Wireless Charger">MagSafe Wireless Charger</option>
                  <option value="LiteBuds Pro True Wireless">LiteBuds Pro True Wireless</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Super fast delivery & 100% original!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your feedback about product quality, packaging, and delivery..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Verified Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
