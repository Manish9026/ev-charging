import React from 'react';
import { Star, ThumbsUp, Flag, User } from 'lucide-react';
import { Review } from '../../types/Station';

interface StationReviewItemProps {
  review: Review;
}

const StationReviewItem: React.FC<StationReviewItemProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
          <User className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{review?.user?.name}</h4>
            <span className="text-sm text-gray-500">{formatDate(review?.createdAt)}</span>
          </div>
          
          <div className="flex items-center mt-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < review?.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          
          <p className="text-gray-700 mb-3">{review?.comment}</p>
          
          <div className="flex items-center text-sm text-gray-500">
            <button className="flex items-center hover:text-gray-700">
              <ThumbsUp className="h-4 w-4 mr-1" />
              Helpful ({review?.helpfulCount})
            </button>
            <span className="mx-2">•</span>
            <button className="flex items-center hover:text-gray-700">
              <Flag className="h-4 w-4 mr-1" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationReviewItem;