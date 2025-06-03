import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStations } from '../../contexts/StationContext';

interface AddReviewFormProps {
  stationId: string;
  onSuccess: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ stationId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { addReview } = useStations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      alert('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      alert('Please add a comment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addReview(stationId, { rating, comment });
      setRating(0);
      setComment('');
      onSuccess();
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50 p-4 rounded-md text-center">
        <p className="text-gray-700">Please log in to leave a review.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="font-medium text-lg mb-3">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star 
                className={`h-6 w-6 ${
                  (hoverRating || rating) >= star 
                    ? 'text-yellow-500 fill-yellow-500' 
                    : 'text-gray-300'
                }`} 
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500 self-center">
            {rating ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          id="comment"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 min-h-[100px]"
          placeholder="Share your experience with this charging station..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Submitting...
          </div>
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  );
};

export default AddReviewForm;