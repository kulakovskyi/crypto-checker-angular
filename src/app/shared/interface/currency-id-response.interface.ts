export interface CurrencyIdResponseInterface {
  additional_notices: []
  asset_platform_id: any
  block_time_in_minutes: number
  categories: string[]
  coingecko_rank: number
  coingecko_score: number
  community_data: CommunityData
    community_score: number
  country_origin: string
  description: any
  detail_platforms: any
  developer_data: any
  developer_score: number
  genesis_date: string
  hashing_algorithm: string
  id: string
  image: CurrencyImage
  last_updated: string
  links: any
  liquidity_score: number
  localization: any
  market_cap_rank: number
  market_data: any
  name: string
  platforms: any
  preview_listing: boolean
  public_interest_score: number
  public_interest_stats: any
  public_notice: any
  sentiment_votes_down_percentage: number
  sentiment_votes_up_percentage: number
  status_updates: []
  symbol: string
  tickers: any[]
  watchlist_portfolio_users: number
}

export interface CommunityData{
    facebook_likes: any
    reddit_accounts_active_48h: number
    reddit_average_comments_48h: number
    reddit_average_posts_48h: number
    reddit_subscribers: number
    telegram_channel_user_count: any
    twitter_followers: number
}

export interface CurrencyImage{
    large: string
    small: string
    thumb: string
}
