"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, ShoppingBag, User, Star, Filter, ChevronDown, Menu, Plus, Minus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

const categories = ["All", "Men", "Women", "Kids", "Home & Living", "Beauty", "Studio"]

const products = [
  {
    id: 1,
    name: "Roadster Men Navy Blue Solid Round Neck T-shirt",
    brand: "Roadster",
    price: 499,
    originalPrice: 999,
    discount: 50,
    rating: 4.2,
    ratingCount: 1200,
    image: "/images/mens-tshirt.jpg",
    category: "Men",
  },
  {
    id: 2,
    name: "SASSAFRAS Women Black Solid A-Line Dress",
    brand: "SASSAFRAS",
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    rating: 4.1,
    ratingCount: 890,
    image: "/images/womens-dress.jpg",
    category: "Women",
  },
  {
    id: 3,
    name: "Nike Men Black Revolution 6 Running Shoes",
    brand: "Nike",
    price: 3495,
    originalPrice: 4995,
    discount: 30,
    rating: 4.4,
    ratingCount: 2100,
    image: "/images/nike-shoes.jpg",
    category: "Men",
  },
  {
    id: 4,
    name: "Libas Women Pink Printed Kurta with Trousers",
    brand: "Libas",
    price: 1799,
    originalPrice: 3599,
    discount: 50,
    rating: 4.3,
    ratingCount: 756,
    image: "/images/womens-kurta.jpg",
    category: "Women",
  },
  {
    id: 5,
    name: "H&M Kids Blue Denim Jacket",
    brand: "H&M",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.0,
    ratingCount: 445,
    image: "/images/kids-jacket.jpg",
    category: "Kids",
  },
  {
    id: 6,
    name: "Puma Men White Sneakers",
    brand: "Puma",
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    rating: 4.2,
    ratingCount: 1567,
    image: "/images/puma-sneakers.jpg",
    category: "Men",
  },
  {
    id: 7,
    name: "Zara Women Beige Blazer",
    brand: "Zara",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.5,
    ratingCount: 234,
    image: "/images/womens-blazer.jpg",
    category: "Women",
  },
  {
    id: 8,
    name: "Adidas Men Black Track Pants",
    brand: "Adidas",
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    rating: 4.1,
    ratingCount: 987,
    image: "/images/mens-trackpants.jpg",
    category: "Men",
  },
]

const brands = ["Nike", "Adidas", "Puma", "H&M", "Zara", "Roadster", "Libas", "SASSAFRAS"]
const priceRanges = ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "₹2000 - ₹5000", "Above ₹5000"]

export default function MyntraClone() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        toast({
          title: "Updated Cart",
          description: `${product.name} quantity increased`,
        })
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      toast({
        title: "Added to Cart",
        description: `${product.name} added to your cart`,
      })
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "Removed from Cart",
      description: "Item removed successfully",
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} removed from wishlist`,
        })
        return prev.filter((item) => item.id !== product.id)
      }
      toast({
        title: "Added to Wishlist",
        description: `${product.name} added to wishlist`,
      })
      return [...prev, product]
    })
  }

  const buyNow = (product) => {
    addToCart(product)
    setCartOpen(true)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some items to your cart first",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Order Placed Successfully!",
      description: `Your order of ₹${getTotalPrice()} has been placed`,
    })
    setCart([])
    setCartOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-pink-600">Myntra</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium hover:text-pink-600 transition-colors pb-4 ${
                    selectedCategory === category ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search for products, brands and more"
                  className="pl-10 bg-gray-50 border-0 focus:bg-white"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span className="text-sm">Profile</span>
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-600">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="sm" className="relative" onClick={() => setCartOpen(true)}>
                <ShoppingBag className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-600">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input type="search" placeholder="Search products..." className="pl-10" />
                    </div>
                    <Separator />
                    <nav className="flex flex-col space-y-4">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category)
                            setMobileMenuOpen(false)
                          }}
                          className={`text-left text-sm font-medium hover:text-pink-600 transition-colors ${
                            selectedCategory === category ? "text-pink-600" : "text-gray-700"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-pink-100 to-purple-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">BIGGEST DEALS ON TOP BRANDS</h1>
          <p className="text-lg text-gray-600 mb-6">Up to 80% OFF on Fashion & Lifestyle</p>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700" onClick={() => setSelectedCategory("All")}>
            Shop Now
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                FILTERS
              </h3>

              <div className="space-y-4">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-3">CATEGORIES</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block text-sm hover:text-pink-600 transition-colors ${
                          selectedCategory === category ? "text-pink-600 font-medium" : "text-gray-600"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-3">BRAND</h4>
                  <div className="space-y-2">
                    {brands.slice(0, 5).map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <Label htmlFor={brand} className="text-sm text-gray-600">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Filter */}
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-3">PRICE</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox id={range} />
                        <Label htmlFor={range} className="text-sm text-gray-600">
                          {range}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort and Results */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort by: Recommended
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Recommended</DropdownMenuItem>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Newest First</DropdownMenuItem>
                  <DropdownMenuItem>Customer Rating</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg?height=300&width=250"}
                        alt={product.name}
                        width={250}
                        height={300}
                        className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors ${
                          wishlist.find((item) => item.id === product.id) ? "text-red-500" : "text-gray-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product)
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlist.find((item) => item.id === product.id) ? "fill-current" : ""}`}
                        />
                      </Button>
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-pink-600 hover:bg-pink-700">
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="text-xs text-gray-500 font-medium">{product.brand}</div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">({product.ratingCount})</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs hover:bg-pink-50 hover:border-pink-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            buyNow(product)
                          }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="hover:bg-pink-50 hover:border-pink-600">
                Load More Products
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart ({getTotalItems()} items)
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Add some products to get started</p>
                  <Button onClick={() => setCartOpen(false)} className="bg-pink-600 hover:bg-pink-700">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-gray-500 font-medium">{item.brand}</p>
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                              <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">ONLINE SHOPPING</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {categories.slice(1).map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className="hover:text-white transition-colors"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">CUSTOMER POLICIES</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    T&C
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Track Orders
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">USEFUL LINKS</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Site Map
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Corporate Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Whitehat
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">EXPERIENCE MYNTRA APP</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent border-gray-600 hover:bg-gray-800"
                >
                  📱 Google Play
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent border-gray-600 hover:bg-gray-800"
                >
                  🍎 App Store
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 www.myntra.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
