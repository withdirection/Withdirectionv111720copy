import { Calendar, MapPin, Clock, Users, Instagram, Plus, ExternalLink, List, CalendarDays, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNotionEvents } from '../../hooks/useNotionEvents';
import { SubmitEventModal, EventSubmission as ModalEventSubmission } from '../components/SubmitEventModal';
import { EventSubmission as ApiEventSubmission } from '../../api/notionEvents';
import { format } from 'date-fns';

export function CommunityPage() {
  const { events, loading, error, submitEvent, submitting } = useNotionEvents();
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => {
        if (filter === 'deaf-led') return event.deafLed;
        if (filter === 'virtual') return event.virtual;
        if (filter === 'arts') return event.type.includes('Arts') || event.type.includes('Museum') || event.type.includes('Performance') || event.type.includes('Art Tour');
        if (filter === 'workshops') return event.type === 'Workshop' || event.type === 'Educational';
        if (filter === 'community') return event.type === 'Community Event';
        return true;
      });

  // Adapter function to convert modal's EventSubmission to API's EventSubmission
  const handleSubmitEvent = async (modalData: ModalEventSubmission): Promise<void> => {
    const apiData: ApiEventSubmission = {
      title: modalData.eventTitle,
      organization: modalData.hostOrganization,
      date: format(modalData.eventDate, 'yyyy-MM-dd'),
      startTime: modalData.startTime,
      endTime: modalData.endTime,
      location: modalData.format === 'Virtual' ? (modalData.platform || 'Virtual') : (modalData.location || ''),
      type: modalData.eventType,
      description: modalData.eventDescription,
      accessTypes: [modalData.accessType],
      format: modalData.format === 'In person' ? 'In-Person' : modalData.format === 'Hybrid' ? 'Hybrid' : 'Virtual',
      contactEmail: modalData.submitterEmail,
      contactName: modalData.submitterName,
    };

    const result = await submitEvent(apiData);
    if (!result.success) {
      throw new Error(result.error || 'Failed to submit event');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Community <span className="text-[#00A9E0]">Calendar</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Accessible events with sign language interpretation throughout Brooklyn and NYC
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-[#00A9E0] px-4 py-2 rounded-full text-sm">Deaf-Led Events</span>
              <span className="bg-[#CB6CE6] px-4 py-2 rounded-full text-sm">Arts & Cultural Programs</span>
              <span className="bg-[#303F9F] px-4 py-2 rounded-full text-sm">Community Announcements</span>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Event CTA */}
      <section className="py-8 bg-gradient-to-r from-[#00A9E0]/10 to-[#303F9F]/10 border-b border-[#E6E9EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl text-[#14213D] mb-2">Have an accessible event to share?</h3>
              <p className="text-gray-600">Submit your event for inclusion in our community calendar</p>
            </div>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 bg-[#00A9E0] text-white px-6 py-3 rounded-md hover:bg-[#303F9F] transition-colors"
            >
              <Plus size={20} />
              Submit Event
            </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-white border-b border-[#E6E9EF] sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === 'all' 
                    ? 'bg-[#00A9E0] text-white' 
                    : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter('deaf-led')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === 'deaf-led' 
                    ? 'bg-[#00A9E0] text-white' 
                    : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
                }`}
              >
                Deaf-Led
              </button>
              <button
                onClick={() => setFilter('virtual')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === 'virtual' 
                    ? 'bg-[#00A9E0] text-white' 
                    : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
                }`}
              >
                Virtual
              </button>
              <button
                onClick={() => setFilter('arts')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === 'arts' 
                    ? 'bg-[#00A9E0] text-white' 
                    : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
                }`}
              >
                Arts & Culture
              </button>
              <button
                onClick={() => setFilter('Workshop')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === 'Workshop' 
                    ? 'bg-[#00A9E0] text-white' 
                    : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
                }`}
              >
                Workshops
              </button>
              <button
                onClick={() => setFilter('Community Event')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  filter === 'Community Event' 
                    ? 'bg-[#00A9E0] text-white' 
                    : 'bg-[#F5F7FA] text-[#14213D] hover:bg-[#E6E9EF]'
                }`}
              >
                Community
              </button>
            </div>

            {/* View Toggle - Compact */}
            <div className="inline-flex bg-[#F5F7FA] rounded-md p-0.5 border border-[#E6E9EF]">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all text-sm ${
                  viewMode === 'list'
                    ? 'bg-white text-[#14213D] shadow-sm'
                    : 'text-gray-600 hover:text-[#14213D]'
                }`}
              >
                <List size={16} />
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all text-sm ${
                  viewMode === 'calendar'
                    ? 'bg-white text-[#14213D] shadow-sm'
                    : 'text-gray-600 hover:text-[#14213D]'
                }`}
              >
                <CalendarDays size={16} />
                Calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-[#00A9E0] animate-spin mb-4" />
              <p className="text-gray-600">Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-red-600 mb-2">Failed to load events</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Calendar className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">No events found</p>
              <p className="text-gray-500 text-sm">
                {filter === 'all'
                  ? 'Check back soon for upcoming events!'
                  : 'Try selecting a different filter or check back later.'}
              </p>
            </div>
          )}

          {/* List View */}
          {!loading && !error && viewMode === 'list' && filteredEvents.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#F5F7FA] rounded-lg border border-[#E6E9EF] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.deafLed && (
                        <span className="bg-[#00A9E0] text-white text-xs px-2 py-1 rounded">
                          Deaf-Led
                        </span>
                      )}
                      <span className="bg-[#CB6CE6] text-white text-xs px-2 py-1 rounded">
                        {event.type}
                      </span>
                    </div>

                    {/* Event Info */}
                    <h3 className="text-xl text-[#14213D] mb-2">{event.title}</h3>
                    <p className="text-sm text-[#303F9F] mb-4">{event.organization}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    <button className="flex items-center gap-2 text-[#00A9E0] hover:text-[#303F9F] transition-colors text-sm font-medium">
                      Learn More
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Calendar View */}
          {!loading && !error && viewMode === 'calendar' && filteredEvents.length > 0 && (
            <div className="bg-white rounded-lg border border-[#E6E9EF] p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl text-[#14213D] mb-2">March - April 2026</h3>
                <p className="text-gray-600">Click on a date to see event details</p>
              </div>
              
              {/* Calendar Grid */}
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {/* March 2026 - Starting on Saturday */}
                  {[...Array(6)].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}
                  
                  {/* March days */}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const eventsOnDay = filteredEvents.filter(e => {
                      const eventDay = parseInt(e.date.split(' ')[1].replace(',', ''));
                      const eventMonth = e.date.split(' ')[0];
                      return eventDay === day && eventMonth === 'March';
                    });
                    
                    return (
                      <div
                        key={day}
                        className={`aspect-square border rounded-lg p-2 hover:border-[#00A9E0] transition-colors ${
                          eventsOnDay.length > 0 
                            ? 'bg-[#00A9E0]/10 border-[#00A9E0] cursor-pointer' 
                            : 'border-[#E6E9EF]'
                        }`}
                      >
                        <div className="text-sm font-medium text-[#14213D] mb-1">{day}</div>
                        {eventsOnDay.length > 0 && (
                          <div className="space-y-1">
                            {eventsOnDay.map(event => (
                              <div
                                key={event.id}
                                className="text-xs bg-[#00A9E0] text-white px-1 py-0.5 rounded truncate"
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* April days */}
                  {[...Array(12)].map((_, i) => {
                    const day = i + 1;
                    const eventsOnDay = filteredEvents.filter(e => {
                      const eventDay = parseInt(e.date.split(' ')[1].replace(',', ''));
                      const eventMonth = e.date.split(' ')[0];
                      return eventDay === day && eventMonth === 'April';
                    });
                    
                    return (
                      <div
                        key={`april-${day}`}
                        className={`aspect-square border rounded-lg p-2 hover:border-[#00A9E0] transition-colors ${
                          eventsOnDay.length > 0 
                            ? 'bg-[#00A9E0]/10 border-[#00A9E0] cursor-pointer' 
                            : 'border-[#E6E9EF]'
                        }`}
                      >
                        <div className="text-sm font-medium text-[#14213D] mb-1">{day}</div>
                        {eventsOnDay.length > 0 && (
                          <div className="space-y-1">
                            {eventsOnDay.map(event => (
                              <div
                                key={event.id}
                                className="text-xs bg-[#00A9E0] text-white px-1 py-0.5 rounded truncate"
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-8 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#00A9E0] rounded"></div>
                  <span className="text-sm text-gray-600">Has Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-[#E6E9EF] rounded"></div>
                  <span className="text-sm text-gray-600">No Events</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 lg:py-24 bg-[#14213D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A9E0]/20 rounded-full mb-6">
              <Instagram className="text-[#00A9E0]" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
              Follow Us on <span className="text-[#00A9E0]">Instagram</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Stay updated with the latest accessible events, community news, and behind-the-scenes content
            </p>
            <a
              href="https://instagram.com/withdirection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-8 py-4 rounded-md hover:opacity-90 transition-opacity text-lg"
            >
              <Instagram size={24} />
              @withdirection
            </a>
          </div>

          {/* Instagram Feed Placeholder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-[#303F9F]">
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-[#00A9E0]/20 to-[#CB6CE6]/20 rounded-lg flex items-center justify-center"
                >
                  <Instagram className="text-white/50" size={48} />
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 mt-6 text-sm">
              Instagram feed integration • Connect your Instagram account to display recent posts
            </p>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-[#14213D] mb-4">
              Partner Organizations
            </h2>
            <p className="text-xl text-gray-600">
              Organizations we work with to promote accessible events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Whitney Museum of American Art',
              'The Drawing Center',
              'Brooklyn Museum',
              'NYC Department of Cultural Affairs',
            ].map((org, index) => (
              <div
                key={index}
                className="bg-[#F5F7FA] p-6 rounded-lg border border-[#E6E9EF] text-center hover:border-[#00A9E0] transition-colors"
              >
                <Users className="text-[#CB6CE6] mx-auto mb-3" size={32} />
                <p className="text-[#14213D]">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Event Modal */}
      <SubmitEventModal
        open={isSubmitModalOpen}
        onOpenChange={setIsSubmitModalOpen}
        onSubmit={handleSubmitEvent}
      />
    </div>
  );
}