import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPage from '../pages/BlogPage';
import { getBlogs } from '../data/blogs';

// Mock the blog data
jest.mock('../data/blogs', () => ({
  getBlogs: jest.fn(),
}));

describe('BlogPage', () => {
  const mockBlogs = [
    {
      id: 1,
      title: 'Test Blog 1',
      excerpt: 'This is a test blog excerpt',
      content: 'Full content of test blog 1',
      image: 'test1.jpg',
      author: 'Test Author',
      date: '2024-01-01',
      readTime: '5 min read',
      category: 'Testing',
      tags: ['test', 'blog'],
      slug: 'test-blog-1',
    },
    {
      id: 2,
      title: 'Test Blog 2',
      excerpt: 'Another test blog excerpt',
      content: 'Full content of test blog 2',
      image: 'test2.jpg',
      author: 'Test Author 2',
      date: '2024-01-02',
      readTime: '3 min read',
      category: 'Testing',
      tags: ['test'],
      slug: 'test-blog-2',
    },
  ];

  beforeEach(() => {
    (getBlogs as jest.Mock).mockReturnValue(mockBlogs);
  });

  it('renders blog page with featured post and blog list', () => {
    render(
      <Router>
        <BlogPage />
      </Router>
    );

    // Check if featured post is rendered
    expect(screen.getByText('Featured Post')).toBeInTheDocument();
    
    // Check that the first blog post is in the featured section
    const featuredTitles = screen.getAllByText(mockBlogs[0].title);
    expect(featuredTitles.length).toBeGreaterThan(0);
    
    // Check if blog list is rendered
    expect(screen.getByText('Latest Posts')).toBeInTheDocument();
    
    // Check that the second blog post is in the list
    const blogTitles = screen.getAllByText(mockBlogs[1].title);
    expect(blogTitles.length).toBeGreaterThan(0);
  });

  it('loads more blogs when Load More button is clicked', () => {
    // Mock more blogs for pagination test
    const moreBlogs = Array(10).fill(0).map((_, i) => ({
      ...mockBlogs[0],
      id: i + 1,
      title: `Blog ${i + 1}`,
      slug: `blog-${i + 1}`,
    }));
    
    (getBlogs as jest.Mock).mockReturnValue(moreBlogs);
    
    render(
      <Router>
        <BlogPage />
      </Router>
    );

    // Initial load should show limited blogs
    expect(screen.getAllByText(/Blog \d+/).length).toBeLessThan(moreBlogs.length);
    
    // Click load more button
    const loadMoreButton = screen.getByText('Load More Articles');
    fireEvent.click(loadMoreButton);
    
    // Should show more blogs after clicking load more
    expect(screen.getAllByText(/Blog \d+/).length).toBeGreaterThan(6);
  });
});
